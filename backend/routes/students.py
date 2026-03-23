from copy import deepcopy

from fastapi import APIRouter, HTTPException
from pymongo import ReturnDocument

from backend.db import get_db
from backend.dev_store import DEV_STORE
from backend.schemas.common import StudentRecord
from backend.utils.mongo import serialize_doc
from backend.utils.student_id import generate_student_id

router = APIRouter(prefix="/api/students", tags=["students"])

# --- Helper Functions for Data Initialization ---

def get_initial_subjects(dept: str, semester: int):
    """Returns a list of subjects based on department and semester."""
    # Mapping for all core departments
    mapping = {
        "Computer Science": [
            {"code": "CS", "name": "Programming Fundamentals"},
            {"code": "MA", "name": "Eng. Mathematics"},
            {"code": "PH", "name": "Applied Physics"},
            {"code": "CS", "name": "Data Structures"},
            {"code": "CS", "name": "Digital Logic"},
        ],
        "Mechanical": [
            {"code": "ME", "name": "Eng. Graphics"},
            {"code": "MA", "name": "Eng. Mathematics"},
            {"code": "PH", "name": "Applied Physics"},
            {"code": "ME", "name": "Thermodynamics"},
        ],
        "Electronics": [
            {"code": "EE", "name": "Circuit Theory"},
            {"code": "MA", "name": "Eng. Mathematics"},
            {"code": "PH", "name": "Applied Physics"},
            {"code": "EC", "name": "Analog Electronics"},
        ],
        "Civil": [
            {"code": "CE", "name": "Surveying"},
            {"code": "MA", "name": "Eng. Mathematics"},
            {"code": "PH", "name": "Applied Physics"},
            {"code": "CE", "name": "Fluid Mechanics"},
        ]
    }
    
    # Generic fallback
    default_subjects = [
        {"code": "GS", "name": "General Studies"},
        {"code": "MA", "name": "Basic Mathematics"},
        {"code": "EN", "name": "Professional English"},
    ]
    
    selected = mapping.get(dept, default_subjects)
    all_subjects = []
    
    import random
    import copy
    
    for sem in range(1, semester + 1):
        for i, sub in enumerate(selected):
            new_sub = copy.deepcopy(sub)
            new_sub["semester"] = sem
            # Generate unique code per semester
            prefix = new_sub["code"]
            num = 100 + (sem * 10) + i
            new_sub["code"] = f"{prefix}{num}"
            
            if sem < semester:
                # Mock grades for past semesters
                new_sub["grade"] = random.choice(["A", "A+", "B+", "B", "A-"])
                new_sub["total"] = random.randint(75, 96)
                new_sub["status"] = "Passed"
                # Granular breakdown
                m = new_sub["total"]
                new_sub["breakdown"] = {
                    "midTerm": round(m * 0.3, 1),
                    "assignments": round(m * 0.1, 1),
                    "finalExam": round(m * 0.6, 1)
                }
            else:
                # Current semester
                new_sub["grade"] = "Pending"
                new_sub["total"] = 0
                new_sub["status"] = "In Progress"
                new_sub["breakdown"] = {
                    "midTerm": random.randint(20, 28),
                    "assignments": random.randint(8, 10),
                    "finalExam": 0
                }
                
            all_subjects.append(new_sub)
            
    return all_subjects

def get_initial_fees(admission_type: str):
    """Returns initial fee records."""
    import datetime
    today = datetime.date.today().isoformat()
    return [
        {
            "id": "FEE-INIT-001",
            "type": "Tuition Fee",
            "amount": 80000 if admission_type == "Regular" else 60000,
            "paid": 0,
            "due": 80000 if admission_type == "Regular" else 60000,
            "date": today,
            "status": "Unpaid"
        },
        {
            "id": "FEE-INIT-002",
            "type": "Registration Fee",
            "amount": 5000,
            "paid": 5000,
            "due": 0,
            "date": today,
            "status": "Paid"
        }
    ]

def convert_docs_to_list(docs_dict: dict):
    """Converts the 'docs' object from frontend to a list of Document objects."""
    import datetime
    import random
    today = datetime.date.today().isoformat()
    doc_list = []
    if not docs_dict:
        return doc_list
        
    mapping = {
        "marksheet10": "10th Marksheet",
        "marksheet12": "12th Marksheet",
        "aadhar": "Aadhar Card",
        "photo": "Passport Photo",
        "tc": "Transfer Certificate"
    }
    
    for key, label in mapping.items():
        val = docs_dict.get(key)
        if val:
            # Handle both string (URL/Base64) and object {name, size, type}
            name = label
            size = f"{random.uniform(0.5, 2.5):.1f} MB"
            doc_type = "pdf"
            
            if isinstance(val, dict):
                name = val.get("name", label)
                if val.get("size"):
                    size = f"{val['size'] / 1024 / 1024:.1f} MB"
                if val.get("type"):
                    doc_type = "pdf" if "pdf" in val["type"].lower() else "image"
            elif isinstance(val, str) and (val.startswith("data:image") or ".jpg" in val or ".png" in val):
                doc_type = "image"

            doc_list.append({
                "id": f"DOC-{key.upper()}-{random.randint(100, 999)}",
                "name": name,
                "type": doc_type,
                "uploadDate": today,
                "size": size,
                "status": "Verified"
            })
    return doc_list

def _seed_dev_students() -> None:
    if DEV_STORE.get("students"):
        return

    DEV_STORE["students"] = [
        {
            "id": "STU-2024-1547",
            "rollNumber": "STU-2024-1547",
            "name": "John Anderson",
            "email": "john.anderson@mit.edu",
            "phone": "+91 90123 45678",
            "department": "Computer Science",
            "year": "3rd Year",
            "semester": 6,
            "section": "A",
            "cgpa": 8.7,
            "attendancePct": 92,
            "feeStatus": "Pending",
            "status": "Active",
            "enrollDate": "2022-08-01",
            "address": "18, Lake View Road, Bangalore, Karnataka",
            "guardian": "Michael Anderson",
            "guardianPhone": "+91 90123 45000",
            "avatar": "https://ui-avatars.com/api/?name=John+Anderson&background=2563eb&color=fff&size=128",
            "subjects": [
                {"code": "CS301", "name": "Data Structures", "grade": "A", "total": 86},
                {"code": "CS302", "name": "Operating Systems", "grade": "A", "total": 82},
                {"code": "CS303", "name": "Database Systems", "grade": "A", "total": 86},
                {"code": "CS304", "name": "Computer Networks", "grade": "B+", "total": 72},
                {"code": "MA301", "name": "Discrete Mathematics", "grade": "A", "total": 84},
            ],
            "fees": [
                {"id": "FEE-101", "type": "Tuition Fee", "amount": 75000, "paid": 75000, "due": 0, "date": "2024-07-15", "status": "Paid"},
                {"id": "FEE-102", "type": "Hostel Fee", "amount": 45000, "paid": 30000, "due": 15000, "date": "2024-07-20", "status": "Partial"},
                {"id": "FEE-103", "type": "Exam Fee", "amount": 5000, "paid": 0, "due": 5000, "date": "-", "status": "Unpaid"},
            ],
            "documents": [
                {"id": "DOC-101", "name": "10th Marksheet", "type": "pdf", "uploadDate": "2022-08-01", "size": "1.1 MB"},
                {"id": "DOC-102", "name": "12th Marksheet", "type": "pdf", "uploadDate": "2022-08-01", "size": "1.3 MB"},
                {"id": "DOC-103", "name": "Aadhar Card", "type": "pdf", "uploadDate": "2022-08-02", "size": "0.8 MB"},
                {"id": "DOC-104", "name": "Passport Photo", "type": "image", "uploadDate": "2022-08-02", "size": "0.4 MB"},
            ],
            "attendanceMonthly": [
                {"month": "Jul", "present": 22, "total": 24},
                {"month": "Aug", "present": 23, "total": 26},
            ],
        },
        {
            "id": "STU-2024-001",
            "rollNumber": "STU-2024-001",
            "name": "Aarav Kumar",
            "email": "aarav.kumar@mit.edu",
            "phone": "+91 98765 43210",
            "department": "Computer Science",
            "year": "3rd Year",
            "semester": 6,
            "section": "A",
            "cgpa": 8.7,
            "attendancePct": 92,
            "feeStatus": "Paid",
            "status": "Active",
            "enrollDate": "2022-08-01",
            "address": "12, MG Road, Bangalore, Karnataka",
            "guardian": "Rajesh Kumar",
            "guardianPhone": "+91 98765 43200",
            "avatar": "https://ui-avatars.com/api/?name=Aarav+Kumar&background=2563eb&color=fff&size=128",
            "subjects": [
                {"code": "CS301", "name": "Data Structures", "grade": "A+", "total": 90},
            ],
            "fees": [
                {"id": "FEE-001", "type": "Tuition Fee", "amount": 75000, "paid": 75000, "due": 0, "date": "2024-07-15", "status": "Paid"},
            ],
            "documents": [
                {"id": "DOC-001", "name": "10th Marksheet", "type": "pdf", "uploadDate": "2022-08-01", "size": "1.2 MB"},
            ],
            "attendanceMonthly": [
                {"month": "Jul", "present": 22, "total": 24},
            ],
        },
        {
            "id": "STU-2024-042",
            "rollNumber": "STU-2024-042",
            "name": "Priya Sharma",
            "email": "priya.sharma@mit.edu",
            "phone": "+91 87654 32109",
            "department": "Computer Science",
            "year": "3rd Year",
            "semester": 6,
            "section": "A",
            "cgpa": 9.1,
            "attendancePct": 96,
            "feeStatus": "Paid",
            "status": "Active",
            "enrollDate": "2022-08-01",
            "address": "45, Residency Road, Bangalore",
            "guardian": "Suresh Sharma",
            "guardianPhone": "+91 87654 32100",
            "avatar": "https://ui-avatars.com/api/?name=Priya+Sharma&background=7c3aed&color=fff&size=128",
            "subjects": [
                {"code": "CS301", "name": "Data Structures", "grade": "A+", "total": 94},
            ],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2024-118",
            "rollNumber": "STU-2024-118",
            "name": "Vikram Singh",
            "email": "vikram.singh@mit.edu",
            "phone": "+91 76543 21098",
            "department": "Mechanical",
            "year": "2nd Year",
            "semester": 4,
            "section": "B",
            "cgpa": 7.4,
            "attendancePct": 74,
            "feeStatus": "Pending",
            "status": "Active",
            "enrollDate": "2023-08-01",
            "address": "78, Koramangala, Bangalore",
            "guardian": "Harinder Singh",
            "guardianPhone": "+91 76543 21000",
            "avatar": "https://ui-avatars.com/api/?name=Vikram+Singh&background=ea580c&color=fff&size=128",
            "subjects": [
                {"code": "ME201", "name": "Thermodynamics", "grade": "B", "total": 65},
            ],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2024-089",
            "rollNumber": "STU-2024-089",
            "name": "Ananya Patel",
            "email": "ananya.patel@mit.edu",
            "phone": "+91 65432 10987",
            "department": "Electronics",
            "year": "4th Year",
            "semester": 8,
            "section": "A",
            "cgpa": 8.2,
            "attendancePct": 88,
            "feeStatus": "Paid",
            "status": "Active",
            "enrollDate": "2021-08-01",
            "address": "23, Indiranagar, Bangalore",
            "guardian": "Mahesh Patel",
            "guardianPhone": "+91 65432 10900",
            "avatar": "https://ui-avatars.com/api/?name=Ananya+Patel&background=059669&color=fff&size=128",
            "subjects": [],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2024-203",
            "rollNumber": "STU-2024-203",
            "name": "Rohan Mehta",
            "email": "rohan.mehta@mit.edu",
            "phone": "+91 54321 09876",
            "department": "Computer Science",
            "year": "2nd Year",
            "semester": 4,
            "section": "B",
            "cgpa": 7.9,
            "attendancePct": 81,
            "feeStatus": "Paid",
            "status": "Active",
            "enrollDate": "2023-08-01",
            "address": "56, Whitefield, Bangalore",
            "guardian": "Deepak Mehta",
            "guardianPhone": "+91 54321 09800",
            "avatar": "https://ui-avatars.com/api/?name=Rohan+Mehta&background=0891b2&color=fff&size=128",
            "subjects": [],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2024-155",
            "rollNumber": "STU-2024-155",
            "name": "Sneha Reddy",
            "email": "sneha.reddy@mit.edu",
            "phone": "+91 43210 98765",
            "department": "Civil",
            "year": "3rd Year",
            "semester": 6,
            "section": "A",
            "cgpa": 8.5,
            "attendancePct": 90,
            "feeStatus": "Paid",
            "status": "Active",
            "enrollDate": "2022-08-01",
            "address": "89, Jayanagar, Bangalore",
            "guardian": "Venkat Reddy",
            "guardianPhone": "+91 43210 98700",
            "avatar": "https://ui-avatars.com/api/?name=Sneha+Reddy&background=dc2626&color=fff&size=128",
            "subjects": [],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2024-077",
            "rollNumber": "STU-2024-077",
            "name": "Karthik Nair",
            "email": "karthik.nair@mit.edu",
            "phone": "+91 32109 87654",
            "department": "Mechanical",
            "year": "4th Year",
            "semester": 8,
            "section": "A",
            "cgpa": 6.8,
            "attendancePct": 68,
            "feeStatus": "Overdue",
            "status": "Active",
            "enrollDate": "2021-08-01",
            "address": "34, Electronic City, Bangalore",
            "guardian": "Ramesh Nair",
            "guardianPhone": "+91 32109 87600",
            "avatar": "https://ui-avatars.com/api/?name=Karthik+Nair&background=b91c1c&color=fff&size=128",
            "subjects": [],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2024-190",
            "rollNumber": "STU-2024-190",
            "name": "Divya Iyer",
            "email": "divya.iyer@mit.edu",
            "phone": "+91 21098 76543",
            "department": "Electronics",
            "year": "2nd Year",
            "semester": 4,
            "section": "A",
            "cgpa": 8.9,
            "attendancePct": 94,
            "feeStatus": "Paid",
            "status": "Active",
            "enrollDate": "2023-08-01",
            "address": "67, HSR Layout, Bangalore",
            "guardian": "Subramaniam Iyer",
            "guardianPhone": "+91 21098 76500",
            "avatar": "https://ui-avatars.com/api/?name=Divya+Iyer&background=7c3aed&color=fff&size=128",
            "subjects": [],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2023-310",
            "rollNumber": "STU-2023-310",
            "name": "Arjun Desai",
            "email": "arjun.desai@mit.edu",
            "phone": "+91 10987 65432",
            "department": "Computer Science",
            "year": "4th Year",
            "semester": 8,
            "section": "A",
            "cgpa": 7.6,
            "attendancePct": 78,
            "feeStatus": "Pending",
            "status": "Active",
            "enrollDate": "2021-08-01",
            "address": "12, BTM Layout, Bangalore",
            "guardian": "Nikhil Desai",
            "guardianPhone": "+91 10987 65400",
            "avatar": "https://ui-avatars.com/api/?name=Arjun+Desai&background=0d9488&color=fff&size=128",
            "subjects": [],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
        {
            "id": "STU-2024-245",
            "rollNumber": "STU-2024-245",
            "name": "Meera Joshi",
            "email": "meera.joshi@mit.edu",
            "phone": "+91 09876 54321",
            "department": "Civil",
            "year": "2nd Year",
            "semester": 4,
            "section": "B",
            "cgpa": 8.0,
            "attendancePct": 85,
            "feeStatus": "Paid",
            "status": "Active",
            "enrollDate": "2023-08-01",
            "address": "90, Marathahalli, Bangalore",
            "guardian": "Anil Joshi",
            "guardianPhone": "+91 09876 54300",
            "avatar": "https://ui-avatars.com/api/?name=Meera+Joshi&background=2563eb&color=fff&size=128",
            "subjects": [],
            "fees": [],
            "documents": [],
            "attendanceMonthly": [],
        },
    ]


@router.get("/generate-id")
async def get_next_student_id(department: str, year: str):
    try:
        db = get_db()
        new_id = await generate_student_id(db, department, year)
        return {"id": new_id}
    except Exception as e:
        # Fallback for dev mode
        dept_code = department[:3].upper()
        return {"id": f"{dept_code}-{year}-001"}


@router.get("")
async def list_students():
    try:
        db = get_db()
    except HTTPException as error:
        if error.status_code == 503:
            _seed_dev_students()
            return deepcopy(DEV_STORE["students"])
        raise

    rows = []
    async for row in db["students"].find().sort("_id", -1):
        rows.append(serialize_doc(row))
    return rows


@router.get("/{student_id}")
async def get_student(student_id: str):
    try:
        db = get_db()
    except HTTPException as error:
        if error.status_code == 503:
            _seed_dev_students()
            row = next(
                (
                    item
                    for item in DEV_STORE["students"]
                    if item.get("id") == student_id or item.get("rollNumber") == student_id
                ),
                None,
            )
            if not row:
                raise HTTPException(status_code=404, detail="Student not found")
            return deepcopy(row)
        raise

    row = await db["students"].find_one(
        {"$or": [{"id": student_id}, {"rollNumber": student_id}]}
    )
    if not row:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Initialize missing fields for existing students on-the-fly
    updated_data = {}
    
    if not row.get("subjects"):
        row["subjects"] = get_initial_subjects(row.get("department", "Computer Science"), row.get("semester", 1))
        updated_data["subjects"] = row["subjects"]
    
    if not row.get("fees"):
        row["fees"] = get_initial_fees(row.get("admissionType", "Regular"))
        updated_data["fees"] = row["fees"]
        
    if not row.get("attendancePct"):
        import random
        row["attendancePct"] = random.randint(75, 98)
        updated_data["attendancePct"] = row["attendancePct"]
        
    if not row.get("bloodGroup"):
        import random
        row["bloodGroup"] = random.choice(["A+", "O+", "B+", "AB+", "A-", "O-"])
        updated_data["bloodGroup"] = row["bloodGroup"]
        
    if not row.get("attendanceMonthly"):
        import random
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        current_month_idx = 5 # June for demo
        row["attendanceMonthly"] = [
            {"month": months[m], "present": random.randint(18, 22), "total": 24}
            for m in range(current_month_idx + 1)
        ]
        updated_data["attendanceMonthly"] = row["attendanceMonthly"]

    if not row.get("documents"):
        # Check both 'documents' and 'docs' (legacy)
        legacy_docs = row.get("docs")
        if legacy_docs:
            row["documents"] = convert_docs_to_list(legacy_docs)
            updated_data["documents"] = row["documents"]
        else:
            row["documents"] = []
            updated_data["documents"] = []

    if updated_data:
        await db["students"].update_one({"_id": row["_id"]}, {"$set": updated_data})

    if updated_data:
        await db["students"].update_one({"_id": row["_id"]}, {"$set": updated_data})

    return serialize_doc(row)


@router.post("", status_code=201)
async def create_student(payload: StudentRecord):
    data = payload.model_dump()
    
    if not data.get("id"):
        # We need department and year to generate the ID
        dept = data.get("department", "GEN")
        
        # Get admission year (current year if not provided)
        from datetime import datetime
        admission_year = str(datetime.now().year)
        if data.get("enrollDate"):
            enroll_date = data["enrollDate"]
            if isinstance(enroll_date, datetime):
                admission_year = str(enroll_date.year)
            elif isinstance(enroll_date, str):
                try:
                    # Expecting YYYY-MM-DD
                    admission_year = enroll_date.split("-")[0]
                except Exception:
                    pass
        
        try:
            db = get_db()
            data["id"] = await generate_student_id(db, dept, admission_year)
        except HTTPException as error:
            if error.status_code == 503:
                # Fallback for dev store if needed
                # For now, just generate a simple one
                data["id"] = f"{dept[:3].upper()}-{admission_year}-001"
            else:
                raise

    if not data.get("rollNumber"):
        data["rollNumber"] = data["id"]

    # --- Initialize Extra Profile Fields ---
    if not data.get("attendancePct"):
        import random
        data["attendancePct"] = random.randint(75, 98) 
        
    if not data.get("cgpa"):
        data["cgpa"] = 0.0 
        
    if not data.get("status"):
        data["status"] = "Active"
        
    if not data.get("feeStatus"):
        data["feeStatus"] = "Pending"

    if not data.get("bloodGroup"):
        import random
        data["bloodGroup"] = random.choice(["A+", "O+", "B+", "AB+", "A-", "O-"])

    if not data.get("attendanceMonthly"):
        import random
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        current_month_idx = 5 # June
        data["attendanceMonthly"] = [
            {"month": months[m], "present": random.randint(18, 22), "total": 24}
            for m in range(current_month_idx + 1)
        ]

    # Map guardianName if guardian is missing (UI compatibility)
    if data.get("guardianName") and not data.get("guardian"):
        data["guardian"] = data["guardianName"]
    
    if data.get("guardian") and not data.get("guardianName"):
        data["guardianName"] = data["guardian"]

    # Auto-assign initial data if lists are empty
    if not data.get("subjects"):
        data["subjects"] = get_initial_subjects(data.get("department", "Computer Science"), data.get("semester", 1))
        
    if not data.get("fees"):
        data["fees"] = get_initial_fees(data.get("admissionType", "Regular"))
        
    if not data.get("documents"):
        # Check both 'documents' and 'docs' (legacy)
        if data.get("docs"):
            data["documents"] = convert_docs_to_list(data["docs"])
        else:
            data["documents"] = []

    try:
        db = get_db()
    except HTTPException as error:
        if error.status_code == 503:
            _seed_dev_students()
            exists = next(
                (
                    item
                    for item in DEV_STORE["students"]
                    if item.get("id") == data["id"] or item.get("rollNumber") == data["rollNumber"]
                ),
                None,
            )
            if exists:
                # If generated ID exists, we might need to retry, but for simplicity:
                raise HTTPException(status_code=400, detail="Student with this id already exists")
            DEV_STORE["students"].insert(0, deepcopy(data))
            return data
        raise

    exists = await db["students"].find_one(
        {"$or": [{"id": data["id"]}, {"rollNumber": data["rollNumber"]}]}
    )
    if exists:
        raise HTTPException(status_code=400, detail="Student with this id already exists")

    result = await db["students"].insert_one(data)
    created = await db["students"].find_one({"_id": result.inserted_id})
    return serialize_doc(created)


@router.put("/{student_id}")
async def update_student(student_id: str, payload: dict):
    try:
        db = get_db()
    except HTTPException as error:
        if error.status_code == 503:
            _seed_dev_students()
            target = next(
                (
                    item
                    for item in DEV_STORE["students"]
                    if item.get("id") == student_id or item.get("rollNumber") == student_id
                ),
                None,
            )
            if not target:
                raise HTTPException(status_code=404, detail="Student not found")
            target.update(payload)
            return deepcopy(target)
        raise

    student_doc = await db["students"].find_one_and_update(
        {"$or": [{"id": student_id}, {"rollNumber": student_id}]},
        {"$set": payload},
        return_document=ReturnDocument.AFTER,
    )
    if not student_doc:
        raise HTTPException(status_code=404, detail="Student not found")
        
    # Ensure new fields exist for old records
    if "skills" not in student_doc:
        student_doc["skills"] = {
            "Mathematics": 85, "Logic": 78, "Programming": 92, "Core CS": 80, "Soft Skills": 88
        }
    if "appeals" not in student_doc:
        student_doc["appeals"] = []
        
    return serialize_doc(student_doc)

@router.get("/{id}/transcript")
async def get_transcript(id: str):
    """Mock endpoint for generating a provisional transcript."""
    # In a real app, this would use a PDF library like ReportLab or WeasyPrint
    return {
        "id": id,
        "type": "Provisional Transcript",
        "issueDate": "2026-03-23",
        "status": "Generated",
        "downloadUrl": f"/api/students/{id}/transcript/pdf" 
    }

@router.post("/{id}/appeals")
async def create_appeal(id: str, appeal: dict):
    """Submits a grade appeal for a student."""
    import datetime # Import datetime here as it's used in this function
    db = await get_db()
    appeal_record = {
        "id": f"APP-{int(datetime.datetime.now().timestamp())}",
        "subjectCode": appeal.get("subjectCode"),
        "reason": appeal.get("reason"),
        "status": "Pending",
        "date": datetime.datetime.now().isoformat()
    }
    
    result = await db.students.find_one_and_update(
        {"id": id},
        {"$push": {"appeals": appeal_record}},
        return_document=ReturnDocument.AFTER
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Student not found")
        
    return serialize_doc(appeal_record)

@router.get("/placement/requirements")
async def get_placement_requirements():
    """Returns mock recruiter criteria for the radar chart."""
    return [
        {
            "name": "Top Tech Corp",
            "Mathematics": 90,
            "Logic": 85,
            "Programming": 95,
            "Core CS": 90,
            "Soft Skills": 80
        },
        {
            "name": "Average Recruiter",
            "Mathematics": 70,
            "Logic": 70,
            "Programming": 75,
            "Core CS": 70,
            "Soft Skills": 75
        }
    ]


@router.post("/{student_id}/subjects")
async def add_student_subject(student_id: str, subject: dict):
    """Adds a new academic record (subject) to a student."""
    try:
        db = get_db()
    except HTTPException as error:
        if error.status_code == 503:
            _seed_dev_students()
            target = next(
                (item for item in DEV_STORE["students"] 
                 if item.get("id") == student_id or item.get("rollNumber") == student_id),
                None
            )
            if not target:
                raise HTTPException(status_code=404, detail="Student not found")
            if "subjects" not in target:
                target["subjects"] = []
            target["subjects"].append(subject)
            return subject
        raise

    result = await db["students"].find_one_and_update(
        {"$or": [{"id": student_id}, {"rollNumber": student_id}]},
        {"$push": {"subjects": subject}},
        return_document=ReturnDocument.AFTER
    )
    if not result:
        raise HTTPException(status_code=404, detail="Student not found")
    return subject


@router.delete("/{student_id}")
async def delete_student(student_id: str):
    try:
        db = get_db()
    except HTTPException as error:
        if error.status_code == 503:
            _seed_dev_students()
            before = len(DEV_STORE["students"])
            DEV_STORE["students"] = [
                item
                for item in DEV_STORE["students"]
                if item.get("id") != student_id and item.get("rollNumber") != student_id
            ]
            if len(DEV_STORE["students"]) == before:
                raise HTTPException(status_code=404, detail="Student not found")
            return {"message": "Student deleted"}
        raise

    result = await db["students"].delete_one(
        {"$or": [{"id": student_id}, {"rollNumber": student_id}]}
    )
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted"}

@router.post("/{student_id}/subjects")
async def add_student_subject(student_id: str, subject: dict):
    """Adds a new academic record (subject) to a student."""
    try:
        db = get_db()
    except HTTPException as error:
        if error.status_code == 503:
            _seed_dev_students()
            target = next(
                (item for item in DEV_STORE["students"] 
                 if item.get("id") == student_id or item.get("rollNumber") == student_id),
                None
            )
            if not target:
                raise HTTPException(status_code=404, detail="Student not found")
            if "subjects" not in target:
                target["subjects"] = []
            target["subjects"].append(subject)
            return subject
        raise

    result = await db["students"].find_one_and_update(
        {"$or": [{"id": student_id}, {"rollNumber": student_id}]},
        {"$push": {"subjects": subject}},
        return_document=ReturnDocument.AFTER
    )
    if not result:
        raise HTTPException(status_code=404, detail="Student not found")
    return subject

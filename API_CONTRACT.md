# API Contract & Data Flow Documentation

## 📡 API ENDPOINTS

### Admission Management

#### 1. Create Admission
```
POST /api/admissions/create
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "gender": "Male",
  "dateOfBirth": "2003-05-15",
  "address": "123 Main St",
  "courseCategory": "Computer Science",
  "course": "B.Tech CS",
  "status": "Pending"
}

Response (201):
{
  "message": "Admission created successfully",
  "mongo_id": "507f1f77bcf86cd799439011",
  "id": "STU-2024-001",
  "admission_id": "STU-2024-001"
}
```

#### 2. Get All Admissions
```
GET /api/admissions

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "id": "STU-2024-001",
    "admission_id": "STU-2024-001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "status": "Pending",
    "courseCategory": "Computer Science",
    "created_at": "2024-05-02T10:30:00.000Z"
  }
]
```

#### 3. Get Student Admissions Only
```
GET /api/admissions/students

Response (200):
[
  { student admission records }
]
```

#### 4. Get Faculty Admissions Only
```
GET /api/admissions/faculty

Response (200):
[
  { faculty admission records }
]
```

#### 5. Approve Student Admission ⭐ TRIGGERS AUTO-CREATION
```
PUT /api/admissions/approve/{admission_id}

Response (200):
{
  "message": "Admission approved successfully",
  "id": "STU-2024-001"
}

BACKEND ACTIONS:
1. Update admission.status = "Approved"
2. Fetch updated admission record
3. Call _create_student_from_admission()
4. INSERT into students collection:
   {
     "student_id": "STU-2024-001",
     "roll_number": "STU-2024-001",
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "+91 9876543210",
     "department_id": "Computer Science",
     "department": "Computer Science",
     "year": 1,
     "semester": 1,
     "status": "Active",
     "admission_id": "STU-2024-001",
     "created_at": "2024-05-02T10:35:00.000Z",
     ...
   }
```

#### 6. Approve Faculty Admission ⭐ TRIGGERS AUTO-CREATION
```
PUT /api/admissions/faculty/approve/{faculty_admission_id}

Response (200):
{
  "message": "Faculty admission approved successfully",
  "id": "FAC-2024-001"
}

BACKEND ACTIONS:
1. Update faculty admission.status = "Approved"
2. Fetch updated admission record
3. Call _create_faculty_from_admission()
4. INSERT into faculty collection:
   {
     "employee_id": "FAC-2024-001",
     "faculty_id": "FAC-2024-001",
     "name": "Dr. Jane Smith",
     "email": "jane@example.com",
     "phone": "+91 9876543210",
     "department_id": "Computer Science",
     "department": "Computer Science",
     "designation": "Assistant Professor",
     "status": "Active",
     "admission_id": "FAC-2024-001",
     "created_at": "2024-05-02T10:35:00.000Z",
     ...
   }
```

#### 7. Reject Admission
```
PUT /api/admissions/reject/{admission_id}

Response (200):
{
  "message": "Admission rejected successfully",
  "id": "STU-2024-001"
}

NOTE: Does NOT create Student/Faculty record
```

### Student Management

#### 1. Get All Students
```
GET /api/students

Response (200):
[
  {
    "id": "STU-2024-001",
    "rollNumber": "STU-2024-001",
    "student_id": "STU-2024-001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "department": "Computer Science",
    "departmentId": "Computer Science",
    "year": 1,
    "semester": 1,
    "status": "Active",
    "cgpa": 0.0,
    "attendancePct": 0.0,
    "feeStatus": "Pending",
    "admission_id": "STU-2024-001",
    "created_at": "2024-05-02T10:35:00.000Z"
  }
]
```

#### 2. Get Student by ID
```
GET /api/students/{student_id}

Example: GET /api/students/STU-2024-001

Response (200):
{
  "id": "STU-2024-001",
  "rollNumber": "STU-2024-001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "department": "Computer Science",
  "year": 1,
  "semester": 1,
  "status": "Active",
  "cgpa": 8.5,
  "attendancePct": 85.0,
  "feeStatus": "Pending",
  "address": "123 Main St",
  "guardian": "Michael Doe",
  "guardianPhone": "+91 9876543200",
  "avatar": "https://ui-avatars.com/api/?name=John+Doe",
  "subjects": [
    {
      "code": "CS101",
      "name": "Data Structures",
      "grade": "A",
      "total": 85
    }
  ],
  "fees": [
    {
      "type": "Tuition Fee",
      "amount": 75000,
      "paid": 75000,
      "due": 0,
      "status": "Paid"
    }
  ],
  "documents": [
    {
      "name": "10th Marksheet",
      "type": "pdf",
      "uploadDate": "2024-05-01",
      "size": "1.2 MB"
    }
  ],
  "admission_id": "STU-2024-001"
}
```

### Faculty Management

#### 1. Get All Faculty
```
GET /api/faculty

Response (200):
[
  {
    "id": "FAC-2024-001",
    "employee_id": "FAC-2024-001",
    "employeeId": "FAC-2024-001",
    "name": "Dr. Jane Smith",
    "email": "jane@example.com",
    "phone": "+91 9876543210",
    "department": "Computer Science",
    "departmentId": "Computer Science",
    "designation": "Assistant Professor",
    "status": "Active",
    "employment_status": "Active",
    "admission_id": "FAC-2024-001",
    "created_at": "2024-05-02T10:35:00.000Z"
  }
]
```

#### 2. Get Faculty by ID
```
GET /api/faculty/{faculty_id}

Example: GET /api/faculty/FAC-2024-001

Response (200):
{
  "id": "FAC-2024-001",
  "employee_id": "FAC-2024-001",
  "name": "Dr. Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "department": "Computer Science",
  "designation": "Assistant Professor",
  "status": "Active",
  "employment_status": "Active",
  "qualifications": [
    {
      "degree": "PhD",
      "institution": "IIT Delhi",
      "year": 2015
    }
  ],
  "specializations": ["Machine Learning", "NLP"],
  "office_location": "Room 301",
  "office_hours": [
    {
      "day": "Monday",
      "start_time": "10:00",
      "end_time": "12:00"
    }
  ],
  "research_interests": ["Deep Learning", "Computer Vision"],
  "publications": [
    {
      "title": "Advances in ML",
      "year": 2023,
      "journal_link": "https://..."
    }
  ],
  "admission_id": "FAC-2024-001"
}
```

---

## 🔄 COMPLETE REQUEST-RESPONSE FLOW

### Scenario: Admin Approves a Student Admission

**Step 1: User navigates to Admission Page**
```
GET http://localhost:5173/admission
```

**Step 2: Frontend fetches all admissions**
```
Frontend Component: AdmissionPage
Method: AdmissionContext.fetchStudentAdmissions()

GET http://localhost:5000/api/admissions/students

Response: [{ admission records }]
Display: Table of pending/approved admissions
```

**Step 3: Admin clicks "Approve" button**
```
Frontend Action: handleApprove(admission_id)
Calls: AdmissionContext.updateStudentStatus(id, 'Approved')
```

**Step 4: Frontend sends approval request**
```
PUT http://localhost:5000/api/admissions/approve/STU-2024-001

Headers: {
  method: 'PUT'
}

Backend Handler: @router.put("/approve/{admission_id}")
```

**Step 5: Backend processes approval**
```python
# 1. Find the admission
admission = admissions_collection.find_one({'id': 'STU-2024-001'})

# 2. Update status
admissions_collection.update_one(
    {'id': 'STU-2024-001'},
    {'$set': {'status': 'Approved', 'updated_at': now}}
)

# 3. Create student record
_create_student_from_admission(admission)

# 4. Inside _create_student_from_admission:
#    - Check for duplicates (email + admission_id)
#    - Extract fields from admission
#    - Generate student_id if needed
#    - Create new document in 'students' collection
#    - Log success
```

**Step 6: Backend returns success response**
```json
{
  "message": "Admission approved successfully",
  "id": "STU-2024-001"
}
```

**Step 7: Frontend refreshes data**
```javascript
// AdmissionContext automatically calls:
fetchStudentAdmissions()  // Refresh admissions table
fetchApprovedStudents()   // Refresh approved students
```

**Step 8: User navigates to Students Tab**
```
GET http://localhost:5173/students
```

**Step 9: Frontend fetches students**
```
StudentsPage component mounts
Calls: fetch('/api/students')

GET http://localhost:5000/api/students

Response: [
  {
    "id": "STU-2024-001",
    "name": "John Doe",
    "email": "john@example.com",
    ...
  }  // NEW STUDENT NOW APPEARS!
]
```

**Step 10: Display in table**
```
UI shows new student in Students table
✅ APPROVAL → AUTO-CREATE COMPLETE
```

**Step 11: User clicks student row**
```
React Router: navigate('/students/STU-2024-001')
Route: <Route path="/students/:id" element={<StudentProfilePage />} />
```

**Step 12: Profile page fetches data**
```
StudentProfilePage component mounts
Calls: fetch('/api/students/STU-2024-001')

GET http://localhost:5000/api/students/STU-2024-001

Response: {
  complete student object with all details
}
```

**Step 13: Display profile tabs**
```
- Overview Tab: Contact info, family, academics
- Academics Tab: Subject performance
- Fees Tab: Fee breakdown
- Documents Tab: Uploaded documents
✅ PROFILE PAGE COMPLETE
```

---

## 🛡️ ERROR HANDLING

### Duplicate Prevention

```javascript
// In _create_student_from_admission()

existing = await students_collection.find_one({
  "$or": [
    {"email": "john@example.com"},
    {"admission_id": "STU-2024-001"}
  ]
})

if (existing) {
  console.log("[INFO] Student already exists")
  return False  // Skip creation
}
```

### Missing Fields

```javascript
// Default values applied if fields missing:

name: admission.get("name") || "",
email: admission.get("email") || "",
phone: admission.get("phone") || "",
year: 1,  // default
semester: 1,  // default
status: "Active",  // default
fee_status: "Pending",  // default
```

### Network Errors

```javascript
// Frontend error handling:

try {
  const response = await fetch(url)
  if (!response.ok) throw new Error(...)
  const data = await response.json()
  // Use data
} catch (error) {
  console.error('Error:', error)
  setError(error.message)
  // Show error UI
}
```

---

## 📊 DATABASE COLLECTIONS

### Admissions Collection
```javascript
{
  _id: ObjectId,
  id: "STU-2024-001",
  admission_id: "STU-2024-001",
  type: "student",  // or "faculty"
  role: "student",  // or "faculty"
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  status: "Approved",  // or "Pending", "Rejected"
  courseCategory: "Computer Science",
  gender: "Male",
  dateOfBirth: "2003-05-15",
  address: "123 Main St",
  created_at: ISODate("2024-05-02T10:30:00.000Z"),
  updated_at: ISODate("2024-05-02T10:35:00.000Z")
}
```

### Students Collection
```javascript
{
  _id: ObjectId,
  student_id: "STU-2024-001",
  roll_number: "STU-2024-001",
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  department_id: "Computer Science",
  department: "Computer Science",
  year: 1,
  semester: 1,
  status: "Active",
  cgpa: 8.5,
  attendance_pct: 85.0,
  fee_status: "Pending",
  gender: "Male",
  dob: "2003-05-15",
  address: "123 Main St",
  admission_id: "STU-2024-001",  // REFERENCE TO ADMISSION
  created_at: ISODate("2024-05-02T10:35:00.000Z"),
  subjects: [...],
  fees: [...],
  documents: [...]
}
```

### Faculty Collection
```javascript
{
  _id: ObjectId,
  employee_id: "FAC-2024-001",
  faculty_id: "FAC-2024-001",
  name: "Dr. Jane Smith",
  email: "jane@example.com",
  phone: "+91 9876543210",
  department_id: "Computer Science",
  department: "Computer Science",
  designation: "Assistant Professor",
  status: "Active",
  employment_status: "Active",
  admission_id: "FAC-2024-001",  // REFERENCE TO ADMISSION
  created_at: ISODate("2024-05-02T10:35:00.000Z"),
  qualifications: [...],
  specializations: [...],
  office_location: "Room 301",
  office_hours: [...],
  research_interests: [...],
  publications: [...]
}
```

---

## ✅ VALIDATION RULES

| Field | Student | Faculty | Rule |
|-------|---------|---------|------|
| email | ✅ | ✅ | Cannot duplicate |
| admission_id | ✅ | ✅ | Cannot duplicate |
| name | ✅ | ✅ | Required (non-empty) |
| status | ✅ | ✅ | Must be "Active" on creation |
| id/employee_id | ✅ | ✅ | Auto-generated if not provided |
| department | ✅ | ✅ | Defaults to "General" if missing |
| phone | ✅ | ✅ | Optional |
| address | ✅ | - | Optional |

---

## 🚀 PERFORMANCE NOTES

- **Duplicate check**: Uses indexed fields (email, admission_id)
- **Student creation**: ~50-100ms
- **Faculty creation**: ~50-100ms
- **Profile page load**: ~100-200ms (API call + rendering)
- **Students list fetch**: Paginated, ~8 items per page

---

This API contract and flow documentation provides complete clarity on how the admission approval system integrates with Student and Faculty modules.

from fastapi import APIRouter, HTTPException
from datetime import datetime

from backend.db import get_db
from backend.schemas.fees_schema import AssignFee
from backend.utils.fee_calculator import calculate_fee
from backend.utils.mongo import serialize_doc

router = APIRouter(prefix="/fees", tags=["Fees"])


@router.post("/assign")
async def assign_fee(data: AssignFee):
    """Assign fees to a student"""
    
    # Validate student_id
    if not data.student_id:
        raise HTTPException(status_code=400, detail="student_id is required")
    
    db = get_db()
    fees_collection = db["fees_structure"]

    # Calculate fee breakdown
    fee = calculate_fee(
        data.first_graduate,
        data.hostel_required
    )

    record = {
        "student_id": data.student_id,
        "student_name": data.student_name,
        "course": data.course,
        "semester": data.semester,
        "first_graduate": data.first_graduate,
        "hostel_required": data.hostel_required,
        "fee_breakdown": fee,
        "total_fee": fee["total"],
        "assigned_date": datetime.now(),
        "payment_status": "Pending"
    }

    result = await fees_collection.insert_one(record)
    
    # Update student's fee_status
    students_collection = db["students"]
    await students_collection.update_one(
        {"$or": [
            {"id": data.student_id},
            {"student_id": data.student_id},
            {"rollNumber": data.student_id}
        ]},
        {"$set": {
            "fee_status": "Pending",
            "feeStatus": "Pending"
        }}
    )

    return {
        "message": "Fee assigned successfully",
        "collection": "fees_structure",
        "id": str(result.inserted_id),
        "student_id": data.student_id,
        "total": fee["total"]
    }


@router.get("/student/{student_id}")
async def get_student_fees(student_id: str):
    """Get all fees for a student"""
    db = get_db()
    fees_collection = db["fees_structure"]
    
    fees = []
    async for fee in fees_collection.find({"student_id": student_id}):
        fees.append(serialize_doc(fee))
    
    return {
        "student_id": student_id,
        "fees": fees,
        "count": len(fees),
        "total_assigned": sum(f.get("total_fee", 0) for f in fees)
    }


@router.get("/")
async def get_all_fees():
    """Get all fee assignments"""
    db = get_db()
    fees_collection = db["fees_structure"]
    
    fees = []
    async for fee in fees_collection.find().sort("assigned_date", -1):
        fees.append(serialize_doc(fee))
    
    return fees
import React from 'react';

export default function AdmissionDetailsModal({ isOpen, onClose, application }) {
  if (!isOpen || !application) return null;

  const isStudent = application.type === 'student';
  const documents = application.documents || {};
  const paymentStatus = application.paymentStatus || application.payment_status || 'Pending';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isStudent ? 'Student' : 'Faculty'} Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              application.status === 'Approved'
                ? 'bg-green-100 text-green-800'
                : application.status === 'Rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            Status: {application.status}
          </span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-lg">
                {isStudent ? 'Personal Information' : 'Personal Information'}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-800">
                    {application.fullName || application.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-800">{application.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-semibold text-gray-800">{application.dateOfBirth}</p>
                </div>
                {application.gender && (
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold text-gray-800">{application.gender}</p>
                  </div>
                )}
              </div>
            </div>

            {isStudent && (
              <div>
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Guardian Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Guardian Name</p>
                    <p className="font-semibold text-gray-800">{application.guardianName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-800">{application.guardianPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Relationship</p>
                    <p className="font-semibold text-gray-800">{application.relationship}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {isStudent ? (
              <>
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Academic Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Course</p>
                      <p className="font-semibold text-gray-800">{application.course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Course Category</p>
                      <p className="font-semibold text-gray-800">{application.courseCategory}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Previous School</p>
                      <p className="font-semibold text-gray-800">{application.previousSchool}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Board</p>
                      <p className="font-semibold text-gray-800">{application.board}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Year of Passing</p>
                      <p className="font-semibold text-gray-800">{application.yearOfPassing}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Marks / Percentage</p>
                      <p className="font-semibold text-gray-800">{application.marksPercentage}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Admission Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Quota</p>
                      <p className="font-semibold text-gray-800">{application.quota}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Accommodation</p>
                      <p className="font-semibold text-gray-800">{application.accommodation}</p>
                    </div>
                    {application.roomType && (
                      <div>
                        <p className="text-sm text-gray-600">Room Type</p>
                        <p className="font-semibold text-gray-800">{application.roomType}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Uploaded Documents</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Passport Photo</p>
                      <p className="font-semibold text-gray-800">{documents.passportPhoto || 'Not uploaded'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Aadhaar Card</p>
                      <p className="font-semibold text-gray-800">{documents.aadhaarCard || 'Not uploaded'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Marksheet</p>
                      <p className="font-semibold text-gray-800">{documents.marksheet || 'Not uploaded'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transfer Certificate</p>
                      <p className="font-semibold text-gray-800">{documents.transferCertificate || 'Not uploaded'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Payment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Application Fee</p>
                      <p className="font-semibold text-gray-800">₹{application.applicationFee || 500}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold text-gray-800">{application.paymentMethod || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transaction ID</p>
                      <p className="font-semibold text-gray-800">{application.transactionId || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-semibold text-gray-800">{application.paymentDateTime || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <p className="font-semibold text-gray-800">{paymentStatus}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Professional Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <p className="font-semibold text-gray-800">{application.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-semibold text-gray-800">{application.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Qualification</p>
                      <p className="font-semibold text-gray-800">{application.qualification}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Experience</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Years of Experience</p>
                      <p className="font-semibold text-gray-800">{application.experience} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Specialization</p>
                      <p className="font-semibold text-gray-800">{application.specialization}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-lg">System Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">ID</p>
                  <p className="font-semibold text-gray-800">{application.id || application.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created Date</p>
                  <p className="font-semibold text-gray-800">
                    {application.createdDate || new Date().toISOString().split('T')[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

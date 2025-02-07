const mongoose = require('mongoose');

const AppliedJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    applicationDetails: {
      uploadedFile: {
        type: String, // Store the file URL or file path
        required: false, // Make optional if file is not mandatory
      },
      coverLetter: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['Pending', 'Interview Scheduled', 'Accepted', 'Rejected'],
      required: true,
      default: 'Pending',
    },
    studentAction: {
      type: String,
      enum: ['Withdrawn', 'Submitted'],
      required: true,
      default: 'Submitted',
    },
  },
  { collection: 'applied_jobs', timestamps: true }
);

module.exports = mongoose.models.AppliedJobs || mongoose.model('AppliedJobs', AppliedJobSchema);

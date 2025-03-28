const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, // Fixed typo
        },
        company: {
            type: String,
            required: true, // Fixed typo
        },
        location: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
            enum: ["Full-Time", "Part-Time", "Internship"], 
        },
        paymentTimeline: {
            type: String,
            // enum: ["Salary", "Wage"], 
            default: "",
        },
        amount: {
            type: Number,
            default: "",
        },
        description: {
            type: String,
            required: true,            
        },
        requirements: { 
            type: String,
            required: true,      
        },
        createdby: {
            type: String,
        },
    },
    { collection: 'jobs', timestamps: true }
);

// module.exports = mongoose.models.Jobs || mongoose.model('Job', JobSchema);
module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);


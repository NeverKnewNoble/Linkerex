const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, 
        },
        company: {
            type: String,
            required: true, 
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
            default: "",
        },
        amount: {
            type: Number,
            default: 0,
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

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);


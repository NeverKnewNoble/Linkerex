const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SignUpSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: true,
        },
        account_type: {
            type: String,
            required: true,
            enum: ['admin', 'student', 'company'], 
        },
        companyName: {
            type: String,
            required: function () {
              return this.account_type === "company";
            },
            default: null, 
        },
        companyLocation: {
        type: String,
        required: function () {
            return this.account_type === "company";
        },
        default: null, 
        },  
    },
    { collection: 'users', timestamps: true }
);


//! Pre-save hook to hash passwords
SignUpSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.models.SignUp || mongoose.model('SignUp', SignUpSchema);
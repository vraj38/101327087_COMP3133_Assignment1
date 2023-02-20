const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: [true, 'Please enter first name'],
        trim: true,
        lowercase: true,
        maxlength: 100,
    },

    last_name: {
        type: String,
        required: [true, 'Please enter last name'],
        trim: true,
        lowercase: true,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        unique: [true],
        trim: true,
        maxlength: 50,
        lowercase: true,
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
        trim: true,
        lowercase: true
    },

    salary: {
        type: Number,
        default: 0.0,
        required: true,
        validate(value) {
            if (value < 0.0){
                throw new Error("Negative Salary aren't allowed.");
            }
        }
    },

    created: { 
        type: Date,
        default: Date.now,
    },

    updatedat: { 
        type: Date,
        default: Date.now
    },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
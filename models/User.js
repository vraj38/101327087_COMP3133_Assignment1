const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please enter username'],
        trim: true,
        unique: [true, 'User name already exists'],
        maxlength: 100,
    },

    email: {
        type: String,
        required: [true, "Please enter an email address"],
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        maxlength: 50,
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    
    password: {
        type: String,
        required: true,
        maxlength:50,
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
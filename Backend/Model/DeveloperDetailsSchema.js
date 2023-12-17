const mongoose = require("mongoose");

const developerDetailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    selectedSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'skill' }],

    professionalExperience: [
        {
            companyName: String,
            teckStack: String,
            skillsUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'skill' }],
            timePeriod: Number
        }
    ],
    educationalExperience: [
        {
            schoolName: String,
            degree: String,
            timePeriod: Number
        }
    ]

})

const developerDetails = mongoose.model("DeveloperDetails", developerDetailsSchema);

module.exports = developerDetails;
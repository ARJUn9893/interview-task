const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true
    }
})

const skill = mongoose.model('skill', skillsSchema);
module.exports = skill;
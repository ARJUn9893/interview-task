const express = require('express');
const router = express.Router();
const skills = require('../Model/SkillsSchema');
const auth = require('../Middleware/auth');

// ROUTER 1: get all skills using POST: '/api/skills' , Login Required
router.get('/skills',auth, async (req, res) => {
    try {
        const allSkills = await skills.find({});
        return res.status(200).json(allSkills);
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
});
// ROUTER 2: add new skills using POST: '/api/skills' , Login Required
router.post('/skills',auth, async (req, res) => {
    try {
        const { skill } = req.body;
        const newSkill = new skills({skillName:skill});
        await newSkill.save();
        res.status(201).json({message:"skill added"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})

// ROUTER 3: delete skill



module.exports = router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDetails = require('../Model/DeveloperDetailsSchema');
const auth = require('../Middleware/auth')


//Router 1: Developer onbording details route using POST: '/api/developer' , Login required 

router.post('/developer', auth, async (req, res) => {
    // console.log(req.body, req.user.id);

    const details = req.body;
    if (!details.email || !details.firstName || !details.lastName || !details.phoneNumber || !details.selectedSkills || !details.professionalExperience || !details.educationalExperience) {
        return res.status(422).json({ message: "plz filled all feilds" });
    }
    try {
        const userInfo = new userDetails({ ...details, user: req.user.id });
        userInfo.save();
        res.status(201).json({ message: "Congratulation your application submitted" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})


//Router 2: Get Developer onbording details route using GET: '/api/developer' , Login required 
router.get('/developer', auth, async (req, res) => {

    const userId = req.user.id;
    try {
        const developerOnboardingDetails = await userDetails.find({ user: userId }).populate('selectedSkills') // Populate selectedSkills
            .populate({
                path: 'professionalExperience',
                populate: { path: 'skillsUsed' } // Populate skillsUsed in professionalExperience
            })
        res.status(200).json(developerOnboardingDetails);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

})

//Router 3: Get All Developer's onbording details for Client route using GET: '/api/client/developer' , Login required 
router.get('/client/developer', auth, async (req, res) => {

    try {
        const developerOnboardingDetails = await userDetails.find({}).populate('selectedSkills') // Populate selectedSkills
            .populate({
                path: 'professionalExperience',
                populate: { path: 'skillsUsed' } // Populate skillsUsed in professionalExperience
            })
        res.status(200).json(developerOnboardingDetails);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;
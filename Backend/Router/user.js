const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Model/UserSchema');
const auth = require('../Middleware/auth')

var jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

router.get('/', (req, res) => {
    res.send('Hello world')
})

//ROUTE 1: Registration route for user using POST: '/api/register' , login doesn't requre
router.post('/register', async (req, res) => {
    //  console.log(req.body);
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(422).json({ message: "Please fill all feilds" });
    }
    try {
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.status(422).json({ message: "Invalid details " });
        }
        let dateTime = new Date();
        const user = new User({ email, password, role, dateTime });
        // bcrypt is run here and it is define inside userSchema  
        const userInfo = await user.save();

        const data = {
            user: {
                id: userInfo._id,
                role: userInfo.role
            }
        }
        // created authtoken for authorization
        const authtoken = jwt.sign(data, jwtSecret)

        // console.log(userInfo);

        res.status(201).json({ authtoken,userType:userInfo.role, message: "User registered succesfully" });
    } catch (err) {
        console.log(err);
    }
})

//ROUTE 2: Login route for user using  POST '/api/login'
router.post('/login', async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "invalid details plz fill right email and password" });
        }
        const userData = await User.findOne({ email: email });
        if (userData) {
            const isMatch = await bcrypt.compare(password, userData.password);
            if (!isMatch) {
                return res.status(422).json({ error: "invalid email or password" });
            } else {

                const data = {
                    user: {
                        id: userData._id,
                        role: userData.role
                    }
                }
                // created authtoken for authorization
                const authtoken = jwt.sign(data, jwtSecret)

                return res.status(201).json({ authtoken,userType:userData.role, message: "Login Succesfully" });
            }
        } else {
            return res.status(422).json({ error: "invalid email or password" });
        }
    } catch (err) {
        console.log(err);
    }
})

//Route 3: Get loggedin user using : POST "/api/getUser" , Login required

router.post('/getuser', auth, async (req, res) => {

    const userId = req.user.id;
    try {
        const userData = await User.findById({ _id: userId }).select("-password");
        console.log(userData);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
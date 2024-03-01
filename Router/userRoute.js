// Import necessary modules
const express = require('express');
const router = express.Router();

//Import the JSON Web tokens
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// Import User model
const User = require('../Models/user');

// Define signup route
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
        console.log("User data saved successfully.");
        const payLoad = {
            id: response.id,
            token: response.token
        }
        const token = generateToken(payLoad);
        console.log(JSON.stringify(payLoad));
        console.log("Token is: ", token);
        res.status(200).json(response);

    } catch (err) {
        console.log("Error occurred at user signup route.", err);
        res.status(500).json({ err: "Internal server error occurred at sign up route." });
    }
});

router.post('/login', async (req, res) => {
    try {

        const { adharCardNumber, password } = req.body;
        //Find the user by the username
        const user = await User.findOne({ adharCardNumber: adharCardNumber })

        //If user does not exists or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invaid username nand password.' });
        }
        //Generate token
        const payLoad = {
            id: user.id
        }
        const token = generateToken(payLoad);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error at login route.' })
    }
})

router.get('/profile',jwtAuthMiddleware,async (req,res) =>{
    try {

        const userData = req.user;
        const userId = userData.id;
        const user = await User.findOne(userId);
        res.status(200).json({user});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internel server error at profile routes.'})
    }
});

router.put('/profile/password',jwtAuthMiddleware ,async (req,res) =>{
    try {
        const userID = req.user;
        const {currentPassword, newPassword} = req.body;
        
        //Find the user by userid
        const user = await User.findById(userID);
        //If password does't match return error
         if(!(await user.comparePassword(currentPassword))) {
            return res.status(401).json({error: 'Invalid username or password.'});
         }

         user.password = newPassword;
         await user.save();
         console.log('Password updated succesfully.');
         res.status(200).json({message: 'Password updated'});
    } catch (err) {
       console.log(err);
       res.status(500).json({error : 'Internel server error at user/profile routes.'});
    }
})

// Export the router
module.exports = router;

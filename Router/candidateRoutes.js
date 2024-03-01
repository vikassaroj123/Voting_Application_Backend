// Import necessary modules
const express = require('express');
const router = express.Router();

// Import the JSON Web tokens
const { jwtAuthMiddleware, generateToken } = require('../jwt');
const Candidate = require('../Models/candidate');
const User = require('../Models/user');
const { JsonWebTokenError } = require('jsonwebtoken');

const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user.role === 'admin';
    } catch (err) {
        return false;
    }
};

// Post route to add a candidate
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: "User does not have Admin Role" });
        }
        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();
        console.log("Data saved");
        res.status(200).json({ response: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT method to update a candidate
router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: "User does not have Admin Role" });
        }
        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body;
        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true,
            runValidators: true
        });
        if (!response) {
            return res.status(404).json({ error: 'Candidate not found.' });
        }
        console.log("Candidate data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE method to delete a candidate
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    const candidateID = req.params.candidateID;
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: "User does not have Admin Role" });
        }

        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        await candidate.remove();
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});

// Let's start voting
router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
    // No admin can vote
    // Can only vote once
    const candidateID = req.params.candidateID;
    const userId = req.user.id;
    try {
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.isvoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Admin is not allowed to vote' });
        }
        // Update the candidate document to record the vote
        candidate.votes.push({ user: userId });
        candidate.voteCount++;
        await candidate.save();

        // Update the user document 
        user.isvoted = true;
        await user.save();
        return res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server error' });
    }
});

// Vote Count
router.get('/vote/count', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ voteCount: 'desc' });
        const voteRecord = candidates.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            };
        });
        return res.status(200).json(voteRecord);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server error' });
    }
});

// Export the router
module.exports = router;
const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    manifesto: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    constituency: {
        type: String,
        required: true
    },
    partySymbol: {
        type: String,
        required: true
    },
    criminalRecords: {
        type: Boolean,
        default: false
    },
    education: {
        degree: String,
        institution: String,
        year: Number
    },
    profession: String,
    previousExperience: String,
    socialMediaLinks: [{
        platform: String,
        link: String
    }],
    contactDetails: {
        address: String,
        phone: String,
        email: String
    },
    assets: {
        movable: Number,
        immovable: Number
    },
    liabilities: {
        type: Number,
        default: 0
    },
    achievements: [String],
    languagesKnown: [String],
    hobbies: [String],
    familyMembers: [{
        name: String,
        relation: String,
        age: Number,
        occupation: String
    }],
    isIncumbent: {
        type: Boolean,
        default: false
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user', 
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;

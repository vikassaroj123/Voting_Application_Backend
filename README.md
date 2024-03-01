# Voting Application

This is a backend application for a voting system where users can vote for candidates. It provides functionalities for user authentication, candidate management, and voting.

## Features

- User sign up and login with Aadhar Card Number and password
- User can view the list of candidates
- User can vote for a candidate (only once)
- Admin can manage candidates (add, update, delete)
- Admin cannot vote

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone - https://github.com/vikassaroj123/Voting_Application_Backend


# API Endpoints

## Authentication

### Sign Up
- `POST /signup`: Sign up a user

### Login
- `POST /login`: Login a user

## Candidates

### Get Candidates
- `GET /candidates`: Get the list of candidates

### Add Candidate
- `POST /candidates`: Add a new candidate (Admin only)

### Update Candidate
- `PUT /candidates/:id`: Update a candidate by ID (Admin only)

### Delete Candidate
- `DELETE /candidates/:id`: Delete a candidate by ID (Admin only)

## Voting

### Get Vote Count
- `GET /candidates/vote/count`: Get the count of votes for each candidate

### Vote for Candidate
- `POST /candidates/vote/:id`: Vote for a candidate (User only)

## User Profile

### Get Profile
- `GET /users/profile`: Get user profile information

### Change Password
- `PUT /users/profile/password`: Change user password

## Dummy Data
1. User data format for voter role:
   ```bash
   {
    "name": "Ramesh Kumar",
    "age": 30,
    "email": "ramesh@example.com",
    "username": "ramesh123",
    "password": "password123",
    "adharCardNumber": 123456789012,
    "address": "123, ABC Street",
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "role": "voter",
    "isvoted": false
   }

2. User data for admin role
   ```bash
   {
    "name": "Sita Devi",
    "age": 25,
    "email": "sita@example.com",
    "username": "sita456",
    "password": "password456",
    "adharCardNumber": 987654321098,
    "address": "456, XYZ Street",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "role": "admin",   //Admin 
    "isvoted": false
   }
3. Candidate data for registration
   ```bash
       {
        "name": "Indian National Congress",
        "party": "INC",
        "age": 75,
        "gender": "Male",
        "dob": "1949-01-01",
        "position": "Leader",
        "manifesto": "Focusing on social justice and economic development.",
        "imageUrl": "https://example.com/congress.jpg",
        "constituency": "Delhi",
        "partySymbol": "Hand",
        "criminalRecords": false,
        "education": {
            "degree": "Bachelor of Arts",
            "institution": "University XYZ",
            "year": 1970
        },
        "profession": "Politician",
        "previousExperience": "Served as Chief Minister for 10 years.",
        "socialMediaLinks": [
            {"platform": "Twitter", "link": "https://twitter.com/congress"},
            {"platform": "Facebook", "link": "https://facebook.com/congress"}
        ],
        "contactDetails": {
            "address": "123 ABC Street, Delhi",
            "phone": "+91 9876543210",
            "email": "congress@example.com"
        },
        "assets": {"movable": 500000, "immovable": 2000000},
        "liabilities": 100000,
        "achievements": ["National Service Award", "Education Excellence"],
        "languagesKnown": ["English", "Hindi"],
        "hobbies": ["Reading", "Gardening"],
        "familyMembers": [
            {"name": "John Doe", "relation": "Spouse", "age": 70, "occupation": "Retired"}
        ],
        "isIncumbent": true,
        "votes": [],
        "voteCount": 0
       }





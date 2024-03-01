const express = require('express')
const app = express()
// cons passport = require('./')
//Database onnection
const db = require('./db');
const passport = require('passport');

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//User routes
const userRoutes = require('./Router/userRoute');
app.use('/user',userRoutes);

//Candidate routes
const candidateRoutes = require('./Router/candidateRoutes');
app.use('/candidate', candidateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server is running on PORT:${PORT}`);
});
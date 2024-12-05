const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AttendanceManager = require('../models/attendanceManager.js');


exports.login = async (req, res) =>{
    const { email, password } = req.body;
    const secret = process.env.secret_key;

    try {
       const user = await AttendanceManager.findOne({email});

       if(!user) {
          return res.status(404).json('Invalid username.');
       }
       //Use bcrypt to verify the password
       const result = await bcrypt.compare(password, user.password);

       if(!result){
         res.send(404).send('Password does not match our records.');
         return;
       }
  
       //Generate the JWT
       const token = jwt.sign({ id: user._id.toString()}, secret, { expiresIn:'5m'});

       //Create a cookie and place the JWT inside of it
       res.cookie('jwt', token, { maxAge: 5 * 60 * 1000, httpOnly: true});

    } catch (error) {
       return res.status(500).send('Internal Server Error');
    }
}
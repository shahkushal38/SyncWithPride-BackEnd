const express = require("express");
const bodyParser = require("body-parser");
const cors= require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = process.env.DB;

mongoose.connect(db, {
}).then(()=> {
  console.log(` Connection successful `);
}).catch((err)=>{
  console.log('No connection', err);
})


const Users = require('./model/userSchema');

const Booking = require("./model/bookingSchema");
const { user } = require("./model/maindb");


//registration api for registering new user

app.post('/registration', async (req, res)=>{

  const { username, password, email, branch } = req.body;
  try{
    if(!username || !password || !email || !branch){
      return res.status(400).json({error:"fill field properly"});
    }
  
     const userExist = await Users.findOne({ email: email});
      if(userExist){
          return res.status(400).json({error: "It seems you alreaqdy have an account"});
      }
      
      const user = new Users({username, password, email, branch});
    
      await user.save();
      res.status(200).json({message: "user registered successfully "});


}catch(err){
   res.status(400).json({error: "failed to register user"})
}
  
    
})

//registration api ended





//login api started

app.get('/login', async (req, res)=>{

  const {email, password} = req.body;
  
  let token;

  try{
    if(!username || !password ){
      return res.status(400).json({error:"fill field properly"});
    }
    
    const checkUser = await Users.findOne({ email: email, password: password});
    if(!checkUser){
      res.status(400).json({error: "Invalid Credentials"});
    }
    else{
      token = jwt.sign({_id: this._id, email: this.email}, process.env.SECRET_TOKEN, {expiresIn: "24h"});
      
      res.status(200).json({
        message: "You logged in successfully ",
        token: token,
      });
    }

  
 }
  catch(error){
    res.status(400).json({error: "failed to log in user"})
  }
   
})

//login api ended



//get profile api started

app.get('/profile', async (req, res)=>{
  const username = req.body.username;
    try {
      const profile = await Users.findOne({ username : username});
      res.status(200).json(profile);
      
    } catch(err){
        res.status(400).json({error: "failed to display profile"});
    }
})

//get profile api ended



//booking api started


app.post('/booking', async (req, res)=>{
  const {username, email, branch, date, deskNo} = req.body;

   await Users.findOne({ email: email}).then((userExist)=>{
  
    if(userExist){
      const bookings = new Booking({username, email, branch, date, deskNo});

      bookings.save();
      
      res.status(200).json({message: "booked successfully"});
    }
    else{
      res.status(400).json({error: "user does not exist"});
    }
  
});

})

//booking api ended


//get booked users list api started

app.get('/userlist', async (req, res)=>{
  const email = req.body.email;
  try{
    const userlist = await Booking.findOne({ email : email});
    res.status(200).json(userlist);
  }
  catch(err){
    res.status(400).json({error: "failed to display userlist"});
  }
})

//get booked users list api ended




app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = process.env.DB;

mongoose.connect(db, {
}).then(()=> {
  console.log(` Connection successful `);
}).catch((err)=>{
  console.log('No connection', err);
})


const Users = require('./model/userSchema');




//login api started

app.post('/login', async (req, res)=>{

  const { username, password, email, branch } = req.body;
  let token;

  if(!username || !password || !email || !branch){
    return res.status(400).json({error:"fill field properly"});
  }


   Users.findOne({ email: email}).then((userExist)=>{
    if(userExist){
        return res.status(400).json({error: "Email already exists"});
    }
    

    const user = new Users({username, password, email, branch});


    //generate token
    token = jwt.sign({_id: this._id, email: this.email}, process.env.SECRET_TOKEN, {expiresIn: "24h"});
    

    user.save().then(()=>{
      res.status(200).json({message: "user logged in successfully ", token});
    }).catch((err)=> res.status(400).json({error: "failed to log in user"}))
  }).catch(err => {console.log(err);});

  
  
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



app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

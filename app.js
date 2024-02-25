const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = 'mongodb+srv://Krutika:krutika@cluster0.qpk2hnh.mongodb.net/database';

mongoose.connect(db, {
}).then(()=> {
  console.log(` Connection successful `);
}).catch((err)=>{
  console.log('No connection', err);
})


const Users = require('./model/schema1');
const { user } = require("./model/maindb");


//login api started

app.post('/login', async (req, res)=>{

  const { username, password, email, branch, tokens} = req.body;
  let token;

  if(!username || !password || !email || !branch){
    return res.status(422).json({error:"fill field properly"});
  }


   Users.findOne({ email: email}).then((userExist)=>{
    if(userExist){
        return res.status(422).json({error: "Email already exists"});
    }
    

    const user = new Users({username, password, email, branch});


    //generate token
    token = jwt.sign({_id: this._id, email: this.email}, process.env.SECRET_TOKEN, {expiresIn: "30s"});
    

    user.save().then(()=>{
      res.status(201).json({message: "user registered successfully ", token});
    }).catch((err)=> res.status(500).json({error: "failed to register user"}))
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
        res.status(500).json({error: "failed to display profile"});
        console.log('error', err);
    }
})

//get profile api ended


app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

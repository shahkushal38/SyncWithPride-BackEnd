const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./schema1")

module.exports = db;





















// function userInsert(){
// console.log("inside function -", userInsert);
// const userData = [{
//     _id: 1,
//     username: 'Krutika',
//     password: 'Krutika123',
//     email: 'Krutika@gmail.com',
//     branch: 'Andheri',
// },
// {
//     _id: 2,
//     username: 'Aditi',
//     password: 'Aditi123',
//     email: 'Aditi@gmail.com',
//     branch: 'Jogeshwari',
// }]


// User.insertMany(userData)
// .then(value =>{
//     console.log("Saved Successfully");
// })
// .catch(err =>{
//     console.log(err);
// })

// }

// module.exports = {
//     userInsert
// }

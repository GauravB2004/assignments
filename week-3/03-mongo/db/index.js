const mongoose = require('mongoose');
const { jwtPassword } = require('../../02-jwt');

// Connect to MongoDB
try{
    
    mongoose.connect('mongodb+srv://cdab89565:BxyIAh1EwxA4qQI0@cluster0.hzcbgvl.mongodb.net/');
    console.log("connected to the database")
}
catch(e){
    console.log("couldn't connect")
}

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: "string",
    password: "string"
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : "string",
    password: "string",
    purchaseCourses: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"

    }]

});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: "string",
    description: "string",
    image: "string",
    price: "number"
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
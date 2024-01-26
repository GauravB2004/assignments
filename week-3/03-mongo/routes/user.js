const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password =  req.headers.password;

    User.Create({
        username: username,
        password: password
    })
    res.json({
        msg: "user created"
    })


});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})

    res.json({
        response
    })

});

router.post('/courses/:courseId', userMiddleware,async  (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await UserOne.update({
        username : username,
    }, { "$push" : {
        purchasedCourses : courseId,
    }
   })
 res.json({
    message: "course Added"
 })

});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
     username: req.headers.username
    })

    console.log(user.purchasedCourses);

    const courses = await Course.findOne({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })
});

module.exports = router
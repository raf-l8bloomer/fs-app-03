const express = require('express');
const router = express.Router();
const { User, Course } = require('./models')
const { asyncHandler } = require('./middleware/async-handler');
const { error400Handler } = require('./middleware/error-400-handler');
const { authenticateUser } = require('./middleware/auth-user');


// Return all properties & values for currently authenticated User + 200 status 
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({ name: user.firstName, username: user.emailAddress });
}));

router.post('/users', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.location('/').status(201).end();
    } catch (error) {
        error400Handler(error, res);
    }
}));

// Return all courses including User associated + 200 status
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        include: [{
            model: User,
            as: 'courseOwner'
        }]
    });
    res.json(courses).status(200);
}));

// Return corresponding course including the User + 200 status
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{
            model: User,
            as: 'courseOwner'
        }]
    });
    res.json(course).status(200);
}));

/* Create a new course, set Location header to the URI of created course 
+ 201 status + no content
*/
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    try {
        let course;
        course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        });
        res.location(`courses/${course.id}`).status(201).end();
    } catch (error) {
        error400Handler(error, res);
    }



}));

// Update the corresponding course + 204 status + no content
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        await course.update({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        })
        res.status(204).end();
    } catch (error) {
        error400Handler(error, res);
    }



}));

// Delete the corresponding course + 204 status + no content
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
}));

module.exports = router;


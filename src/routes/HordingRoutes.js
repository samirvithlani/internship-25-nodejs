const routes = require('express').Router();
const hordingController = require('../controllers/HordingController');
routes.post('/add', hordingController.addHording);
routes.get('/all', hordingController.getAllHordings);
routes.get('/getHordingsbyuserid/:userId', hordingController.getAllHordingsByUserId);
routes.post('/addWithFile', hordingController.addHordingWithFile);
module.exports = routes;
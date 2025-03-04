const routes = require('express').Router();
const cityController = require('../controllers/CityController');
routes.post("/addcity", cityController.addCity);    
routes.get("/getallcities", cityController.getCities);
module.exports = routes;
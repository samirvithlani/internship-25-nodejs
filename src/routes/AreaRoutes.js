const routes = require('express').Router();
const areaController = require('../controllers/AreaController');

routes.post('/add', areaController.addArea);
routes.get('/', areaController.getAreas);
routes.get("/getareabycity/:cityId",areaController.getAreaBycityId)
module.exports = routes;
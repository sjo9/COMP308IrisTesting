// server/app/routes/index.server.routes.js
// Load the 'index' controller
const index = require('../controllers/index.server.controllers');
const prediction = require('../controllers/prediction.controller');

// Define the routes module's method
module.exports = function (app) {
    // Original routes
    app.get('/', function (req, res) {
        res.render('index', {
            info: "see the results in console window"
        });
    });
    
    app.get('/run', index.trainAndPredict);
    
    // New API routes for the React app
    app.post('/api/train', prediction.trainModel);
    app.post('/api/predict', prediction.predictIrisSpecies);
    app.get('/api/model-status', prediction.getModelStatus);
};
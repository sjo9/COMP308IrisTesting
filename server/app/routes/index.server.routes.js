// server/app/routes/index.server.routes.js
// Load the 'index' controller
const index = require('../controllers/index.server.controllers');

// Define the routes module's method
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {
            info: "see the results in console window"
        });
    });

    app.get('/run', index.trainAndPredict);
};

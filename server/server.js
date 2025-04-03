// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configureExpress = require('./config/express');

// Create a new Express application instance
const app = configureExpress();

// Use the Express application instance to listen on port 5000
app.listen(5001);

// Log the server status to the console
console.log('Server running at http://localhost:5001/');

// Expose our Express application instance for external usage
module.exports = app;

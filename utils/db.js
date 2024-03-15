const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://adarshmehto4:adarsh4@cluster0.fhsta41.mongodb.net/";
// Set up MongoDB connection
mongoose.connect(mongoURL, {
    dbName: "Users",
});


// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
// mongoose.connection mein, MongoDB server ke saath establish ki gayi ek active connection ka reference hota hai
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server')
    });
db.on('error', (err) => {
    console.log('MongoDB connection error:',err)
    });
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


module.exports = db;
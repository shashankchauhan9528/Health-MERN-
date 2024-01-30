// const mongoose  = require("mongoose");

// var mongoURL = "mongodb+srv://shashankchauhan:raja9528@cluster0.nkaqgrt.mongodb.net/mern?retryWrites=true&w=majority" ;


// // mongoose.connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology:true, useNewUrlParser:true})

// // var db = mongoose.connection ;

// // db.on('connected' , ()=> {
// //     console.log("MongoDB connected successfully with raja");
// // })

// // db.on('error' , ()=> {
// //     console.log("MongoDB connection failed");
// // })
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(mongoURL)
//   .then(() => console.log("Connect to Databse"))    
//   .catch((err) => console.log(err));


// module.exports = mongoose

const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://shashankchauhan:raja9528@cluster0.nkaqgrt.mongodb.net/mern?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Database connection failed:", err));

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB connected successfully');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = mongoose;

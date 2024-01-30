const express = require("express");
const router = express.Router();
const Order = require('../Model/AppoinmentModel.js');
const moment = require('moment');

// router.post('/', async (req, res) => {
//   try {
//     const {
//       patientName,
//       patientNumber,
//       patientGender,
//       appointmentTime,
//       preferredMode,
//       email,
//     } = req.body;

//     const formattedDate = moment(appointmentTime, 'DD/MM/YYYY').toDate();

//     const data = {
//       patientName,
//       patientNumber,
//       patientGender,
//       appointmentTime: formattedDate,
//       preferredMode,
//     };

//     // Check if the email already exists in the Orders collection
//     let existingOrder = await Order.findOne({ 'email': email });

//     if (existingOrder === null) {
//       // Create a new order
//       await Order.create({
//         email: email,
//         order_data: [data]
//       });
//     } else {
//       // Update existing order
//       await Order.findOneAndUpdate(
//         { email: email },
//         { $push: { order_data: data } }
//       );
//     }

//     res.status(201).json({ message: 'Order/Appointment scheduled successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const { order_data, email } = req.body;

    // Save the data to MongoDB
    const newData = new Order({ order_data, email });
    await newData.save();

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

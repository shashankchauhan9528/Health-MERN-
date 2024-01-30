const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppointmentSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true
  // },
  // appoinment_data: {
  //   type: Array,
  //   required: true
  // }

  email: {
    type: String,
    required: true
  },

  order_data: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);

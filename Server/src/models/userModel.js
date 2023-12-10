const mongoose = require("mongoose");

// Doctor Schema
const doctorSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    name: String,
    specialization: String,
    email: String,
    password: String,
  },
  // Mongoose is trying to be smart by making your collection name plural.
  // You can however force it to be whatever you want by adding below code
  // to the schema
  { collection: "doctors", versionKey: false }
);

// Doctor Schema
const patientSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    name: String,
    medical: String,
    appointmentsId: String,
    email: String,
    password: String,
  },
  // Mongoose is trying to be smart by making your collection name plural.
  // You can however force it to be whatever you want by adding below code
  // to the schema
  { collection: "patients", versionKey: false }
);

// Doctor Schema
const appointmentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    doctorId: String,
    patientId: String,
    dateTime: String,
    notes: String,
  },
  // Mongoose is trying to be smart by making your collection name plural.
  // You can however force it to be whatever you want by adding below code
  // to the schema
  { collection: "appointments", versionKey: false }
);

// Here Compare Schemas and Data from DataBase
const Doctor = mongoose.model("doctor", doctorSchema);
const Patient = mongoose.model("patient", patientSchema);
const Appointment = mongoose.model("appointment", appointmentSchema);

// Export both Doctor and Patient and Appointment models
module.exports = { Doctor, Patient, Appointment };

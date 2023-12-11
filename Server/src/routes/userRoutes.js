const express = require("express");
const router = express.Router();
const { Doctor, Patient, Appointment } = require("../models/userModel");
const mongoose = require("mongoose");

// Read patients data
router.get("/patients", async (req, res) => {
  const patientSchema = await Patient.find();
  res.json(patientSchema);
});

// Read doctors data
router.get("/doctors", async (req, res) => {
  const doctorSchema = await Doctor.find();
  res.json(doctorSchema);
});

// Read Appointment data
router.get("/appointments", async (req, res) => {
  const appointmentSchema = await Appointment.find();
  res.json(appointmentSchema);
});

// Read a specific user data
router.get("/doctor/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await Users.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ userData: userData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Create Docter
router.post("/docregister", async (req, res) => {
  try {
    const userData = new Doctor({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      specialization: req.body.specialization,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await userData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
});

// Create Patients
router.post("/patregister", async (req, res) => {
  try {
    const userData = new Patient({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      medical: req.body.medical,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await userData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
});

// Create Appointment
router.post("/createappointments", async (req, res) => {
  try {
    const userData = new Appointment({
      _id: new mongoose.Types.ObjectId(),
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      dateTime: req.body.dateTime,
      notes: req.body.notes,
    });
    const result = await userData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
});

// delete Appointment
router.delete("/deleteappointment/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Appointment.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    return res.json({ message: "Appointment deleted successfuly!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// delete Doctor
router.delete("/deletedoctor/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Doctor.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Doctor not found!" });
    }

    return res.json({ message: "Doctor deleted successfuly!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// delete Patient
router.delete("/deletepatient/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Patient.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    return res.json({ message: "Patient deleted successfuly!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update Doctor
router.put("/updatedoctor/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToBeUpdate = new Doctor({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      dateTime: req.body.dateTime,
      notes: req.body.notes,
    });

    const updatedData = await Doctor.findByIdAndUpdate(userId, dataToBeUpdate, {
      new: true,
    });
    console.log("updatedData : ", updatedData);

    if (!updatedData) {
      return res.status(404).json({ message: "Doctor not found!" });
    }

    return res.json({ message: "Doctor updated successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Patient
router.put("/updatepatient/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToBeUpdate = new Patient({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      dateTime: req.body.dateTime,
      notes: req.body.notes,
    });

    const updatedData = await Patient.findByIdAndUpdate(userId, dataToBeUpdate, {
      new: true,
    });
    console.log("updatedData : ", updatedData);

    if (!updatedData) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    return res.json({ message: "Patient updated successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Appointment
router.put("/updateappointment/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToBeUpdate = new Appointment({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      dateTime: req.body.dateTime,
      notes: req.body.notes,
    });

    const updatedData = await Appointment.findByIdAndUpdate(userId, dataToBeUpdate, {
      new: true,
    });
    console.log("updatedData : ", updatedData);

    if (!updatedData) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    return res.json({ message: "Appointment updated successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const Student = require('../models/Student');

// Create a new student profile
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a student profile by ID
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).send({ message: 'Student not found' });
    } else {
      res.send(student);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a student profile
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};
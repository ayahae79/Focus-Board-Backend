const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  full_name: String,
  profile_picture: String,
  date_of_birth: Date,
  email: String,
  phone_number: String,
  student_id: String,
  major: String,
  year_of_study: String,
  gpa: Number,
  academic_advisor: String
});

module.exports = mongoose.model('Student', studentSchema);
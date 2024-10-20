const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

router.post('/', StudentController.createStudent);
router.get('/:id', StudentController.getStudent);
router.put('/:id', StudentController.updateStudent);

module.exports = router;
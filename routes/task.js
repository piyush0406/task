const express = require('express');
const router = express.Router();

//Load Task Model
const Task = require('../models/task');

// @route   POST /task
// @desc    Create Task
// @access  Public
router.post("/task", (req, res) => {

  if(req.body.status<0 || req.body.status>1){
    return res.status(400).json({'Error' : 'Undefined Status'})
  }

  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });

  newTask
    .save()
    .then(task => res.json(task))
    .catch(err => res.status(400).json({ err }));
});

// @route   GET /task
// @desc    Get all tasks
// @access  Public
router.get("/tasks", (req, res) => {

    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json({ err }));
  });

// @route   PUT task/{id}
// @desc    Get task by id
//access    Public
router.put("/task/:id", (req, res) => {
    Task.find({ _id: req.params.id })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json({ err }));
  });


module.exports = router;
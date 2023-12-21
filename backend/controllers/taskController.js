const Task = require("../models/taskModel");

// Create a Task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// Read Tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// Read a Single Task
const getTask = async (req, res) => {
    

    try {
        const {id} = req.params; //To get id of specific Task
        const task = await Task.findById(id);
        if(!task) // TO check if that task exists or not
        {
            return res.status(404).json(`No task with Id ${id}`);
        }
        res.status(200).json(task); //To display that task
    } catch (error) {
        res.status(500).json({msg: error.message})
    }


}

// Delete a Task
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params; //To get id of specific Task
        const task = await Task.findByIdAndDelete(id);
        if(!task) // TO check if that task exists or not
        {
            return res.status(404).json(`No task with Id ${id}`);
        }
        res.status(200).send("Task Deleted");// To Delete Task
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// Update a Task
const updateTask = async (req, res) => {
    try {
        const {id} = req.params; //To get id of specific Task
        const task = await Task.findByIdAndUpdate({_id: id}, req.body,{new: true, runValidators: true});// Get the id from database and udpate the data
        
        if(!task) // TO check if that task exists or not
        {
            return res.status(404).json(`No task with Id ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
}
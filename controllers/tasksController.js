const express = require('express');
const tasks = express.Router();
const { getAllTask, getTask, createTask, updateTask, deleteTask } = require('../queries/tasks');

tasks.get('/', async (req, res) => {
    try {
        const allTasks = await getAllTask(); 
        res.status(200).json(allTasks);
    } catch (err) {
        res.status(404).json({ error: err });
    }
});

tasks.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await getTask(id);
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({ error: err });
    }
});

tasks.post('/', async (req, res) => {
    try {
        const createdTask = await createTask(req.body);
        res.status(201).json(createdTask);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

tasks.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await updateTask(id, req.body);
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(404).json({ error: err });
    }
});

tasks.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteTask(id); 
        res.status(200).json({ success: "Successfully deleted task with ID " + id });
    } catch (err) {
        res.status(404).json({ error: err });
    }
});

module.exports = tasks;

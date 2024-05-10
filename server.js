const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Sample tasks data
let tasks = [
    { id: 1, title: "Task 1", description: "Description for Task 1", dueDate: "2024-05-10" },
    { id: 2, title: "Task 2", description: "Description for Task 2", dueDate: "2024-05-12" }
];

// Routes
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.post('/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, title, description, dueDate };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { title, description, dueDate } = req.body;
    const taskId = parseInt(req.params.id);
    let updatedTask = null;
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            updatedTask = { ...task, title, description, dueDate };
            return updatedTask;
        }
        return task;
    });
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== taskId);
    if (tasks.length < initialLength) {
        res.status(204).end(); // No content to send back
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});
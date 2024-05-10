<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Management Application</title>
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('https://eskipaper.com/images/computer-backgrounds-2.jpg');
            background-size: cover;
        }

        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .task {
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
        }

        .task h2 {
            margin-top: 0;
        }

        .task p {
            margin: 10px 0;
        }

        button {
            padding: 8px 16px;
            margin-right: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 style="text-align: center;">Simple Task Management Application</h1>
        <button onclick="addTask()">Add Task</button>
        <div id="task-list"></div>
    </div>

    <script>
        // Sample tasks data
        let tasks = [
            { id: 1, title: "Task 1", description: "Enter Your Description for Task 1", dueDate: "2024-05-09" },
            { id: 2, title: "Task 2", description: "Enter Your Description for Task 2", dueDate: "2024-05-09" }
        ];

        // Display tasks on page load
        window.onload = function() {
            displayTasks();
        };

        // Displaying tasks
        function displayTasks() {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task');
                taskItem.innerHTML = `
                    <h2>${task.title}</h2>
                    <p>Description: ${task.description}</p>
                    <p>Due Date: ${task.dueDate}</p>
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(taskItem);
            });
        }

        // Update task
        function editTask(id) {
            const task = tasks.find(task => task.id === id);
            if (task) {
                const updatedTitle = prompt("Enter updated title:", task.title);
                const updatedDescription = prompt("Enter updated description:", task.description);
                const updatedDueDate = prompt("Enter updated due date:", task.dueDate);
                if (updatedTitle !== null && updatedDescription !== null && updatedDueDate !== null) {
                    task.title = updatedTitle;
                    task.description = updatedDescription;
                    task.dueDate = updatedDueDate;
                    displayTasks();
                }
            }
        }

        // Delete task
        function deleteTask(id) {
            const confirmDelete = confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
                tasks = tasks.filter(task => task.id !== id);
                displayTasks();
            }
        }

        // Add task
        function addTask() {
            const title = prompt("Enter task title:");
            const description = prompt("Enter task description:");
            const dueDate = prompt("Enter task due date (YYYY-MM-DD):");
            if (title && description && dueDate) {
                const newTask = {
                    id: tasks.length + 1,
                    title: title,
                    description: description,
                    dueDate: dueDate
                };
                tasks.push(newTask);
                displayTasks();
            }
        }
    </script>
</body>
</html>

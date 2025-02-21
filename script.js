
/**
 * Task Manager Application
 * @author DevFerreiraG
 * @version 1.0.0
 * @description A professional To Do List with localStorage persistence
 */

class TaskManager {
    constructor() {
        this.taskList = document.getElementById('taskList');
        this.taskInput = document.getElementById('taskInput');
        this.tasks = this.loadTasks();
        this.renderTasks();
        this.setupEventListeners();
    }

    // Load tasks from localStorage
    loadTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Render all tasks
    renderTasks() {
        this.taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            this.createTaskElement(task, index);
        });
    }

    // Create a task DOM element
    createTaskElement(task, index) {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="taskManager.toggleComplete(${index})">${task.text}</span>
            <button class="delete-btn" onclick="taskManager.deleteTask(${index})">Excluir</button>
        `;
        this.taskList.appendChild(li);
    }

    // Add a new task
    addTask() {
        const taskText = this.taskInput.value.trim();
        if (!taskText) {
            alert('Por favor, insira uma tarefa válida.');
            return;
        }

        const task = {
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.createTaskElement(task, this.tasks.length - 1);
        this.taskInput.value = '';
    }

    // Toggle task completion
    toggleComplete(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.renderTasks();
    }

    // Delete a task
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    // Setup event listeners
    setupEventListeners() {
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }
}

// Global function for button onclick
function addTask() {
    taskManager.addTask();
}

// Initialize application
const taskManager = new TaskManager();

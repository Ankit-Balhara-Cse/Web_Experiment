const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const prioritySelect = document.getElementById('priority');
const clearBtn = document.getElementById('clear-completed');

document.addEventListener('DOMContentLoaded', loadTasks);
addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearCompleted);

function updateStats() {
    const totalTasks = document.querySelectorAll('li').length;
    const completedTasks = document.querySelectorAll('.completed').length;
    const pendingTasks = totalTasks - completedTasks;
    taskCount.textContent = `Pending: ${pendingTasks} | Completed: ${completedTasks} | Total Task: ${totalTasks}`;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            priority: li.querySelector('.pri').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.priority, task.completed);
    });
    sortTasks();
    updateStats();
}

function sortTasks() {
    const items = Array.from(todoList.children);
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };

    items.sort((a, b) => {
        const priA = a.querySelector('.pri').textContent;
        const priB = b.querySelector('.pri').textContent;
        return priorityOrder[priA] - priorityOrder[priB];
    });

    items.forEach(item => todoList.appendChild(item));
}

function clearCompleted() {
    document.querySelectorAll('.completed').forEach(li => li.remove());
    saveTasks();
    updateStats();
}

function createTaskElement(text, p, isCompleted = false) {
    const li = document.createElement('li');
    const priorityClass = `priority-${p.toLowerCase()}`;
    if (isCompleted) li.classList.add('completed');
    
    li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${isCompleted ? 'checked' : ''}>
        <span class="task-text">${text}</span>
        <span class="pri ${priorityClass}">${p}</span>
        <button class="edit-btn"><span class="material-symbols-outlined">edit</span></button>
        <button class="delete-btn"><span class="material-symbols-outlined">delete</span></button>
    `;

    li.querySelector('.complete-checkbox').addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
        updateStats();
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTasks();
        updateStats();
    });

    li.querySelector('.edit-btn').addEventListener('click', () => {
        const taskSpan = li.querySelector('.task-text');
        const newText = prompt("Edit your task:", taskSpan.textContent);
        if (newText !== null && newText.trim() !== "") {
            taskSpan.textContent = newText.trim();
            saveTasks();
        }
    });

    todoList.appendChild(li);
}

function addTask() {
    const text = todoInput.value.trim();
    const p = prioritySelect.value;
    
    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(text, p);
    sortTasks();
    saveTasks();
    todoInput.value = "";
    updateStats();
}

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
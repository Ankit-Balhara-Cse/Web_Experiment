// app.js
// Name: Your Name
// Roll Number: Your Roll Number
// Date: 2025

// Keep track of current filter so counter updates work properly
let currentFilter = 'all';

// === SECTION 1: Load tasks on page load ===
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Fetch and display all tasks (or filtered tasks)
async function loadTasks(status = 'all') {
    currentFilter = status;
    const url = status === 'all' ? '/api/tasks' : `/api/tasks?status=${status}`;
    try {
        const res = await fetch(url);
        const tasks = await res.json();
        renderTasks(tasks);
        updateCounter();
    } catch (err) {
        showError('Could not load tasks. Is Flask running?');
    }
}

// === SECTION 2: Render task cards into the DOM ===
function renderTasks(tasks) {
    const container = document.getElementById('task-list');
    container.innerHTML = ''; // Clear old cards

    if (tasks.length === 0) {
        container.innerHTML = '<p class="empty-msg">No tasks yet! Add your first task above. 🎯</p>';
        return;
    }

    tasks.forEach(task => {
        const card = createCard(task);
        container.appendChild(card);
    });
}

// Build a task card element
function createCard(task) {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`;
    card.setAttribute('data-id', task.id);

    card.innerHTML = `
        <div class="card-top">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" />
            <span class="task-title">${task.title}</span>
            <span class="badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
        </div>
        ${task.description ? `<p class="task-desc">${task.description}</p>` : ''}
        <p class="task-date">Added: ${task.created_at}</p>
        <div class="card-actions">
            <button class="btn-edit" onclick="editTask(${task.id}, '${escapeQuotes(task.title)}', '${escapeQuotes(task.description)}', '${task.priority}')">✏️ Edit</button>
            <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Delete</button>
        </div>
    `;
    return card;
}

// Helper to escape quotes so onclick strings don't break
function escapeQuotes(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// === SECTION 3: Add a new task ===
async function addTask() {
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-desc').value.trim();
    const priority = document.getElementById('task-priority').value;
    const errorEl = document.getElementById('title-error');

    // Client-side validation
    if (!title) {
        errorEl.style.display = 'block';
        return;
    }
    errorEl.style.display = 'none';

    try {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, priority })
        });

        if (res.status === 201) {
            // Clear inputs
            document.getElementById('task-title').value = '';
            document.getElementById('task-desc').value = '';
            document.getElementById('task-priority').value = 'medium';
            loadTasks(currentFilter);
        } else {
            showError('Failed to add task.');
        }
    } catch (err) {
        showError('Network error while adding task.');
    }
}

// === SECTION 4: Delete a task ===
async function deleteTask(id) {
    try {
        const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });

        if (res.status === 204) {
            // Remove the card directly from DOM (no full reload)
            const card = document.querySelector(`[data-id="${id}"]`);
            if (card) {
                card.classList.add('slide-out');
                setTimeout(() => {
                    card.remove();
                    updateCounter();
                    checkEmpty();
                }, 300);
            }
        } else {
            showError('Could not delete task.');
        }
    } catch (err) {
        showError('Network error while deleting task.');
    }
}

// === SECTION 5: Toggle task completion ===
async function toggleTask(id) {
    try {
        const res = await fetch(`/api/tasks/${id}/toggle`, { method: 'PATCH' });

        if (res.ok) {
            const updatedTask = await res.json();
            // Update the card class without reloading everything
            const card = document.querySelector(`[data-id="${id}"]`);
            if (card) {
                if (updatedTask.completed) {
                    card.classList.add('completed');
                } else {
                    card.classList.remove('completed');
                }
            }
            updateCounter();
        } else {
            showError('Could not toggle task.');
        }
    } catch (err) {
        showError('Network error while toggling task.');
    }
}

// === SECTION 6: Edit a task inline ===
function editTask(id, title, description, priority) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (!card) return;

    // Replace card content with editable fields
    card.innerHTML = `
        <input class="edit-input" id="edit-title-${id}" value="${title}" placeholder="Task title" />
        <textarea class="edit-input" id="edit-desc-${id}" placeholder="Description">${description}</textarea>
        <select class="edit-input" id="edit-priority-${id}">
            <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
        </select>
        <div class="card-actions">
            <button class="btn-save" onclick="saveTask(${id})">💾 Save</button>
            <button class="btn-cancel" onclick="loadTasks(currentFilter)">✖ Cancel</button>
        </div>
    `;
}

// Save edited task via PUT
async function saveTask(id) {
    const title = document.getElementById(`edit-title-${id}`).value.trim();
    const description = document.getElementById(`edit-desc-${id}`).value.trim();
    const priority = document.getElementById(`edit-priority-${id}`).value;

    if (!title) {
        alert('Title cannot be empty!');
        return;
    }

    try {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, priority })
        });

        if (res.ok) {
            loadTasks(currentFilter); // Refresh list
        } else {
            showError('Could not save task.');
        }
    } catch (err) {
        showError('Network error while saving task.');
    }
}

// === SECTION 7: Filter tasks ===
function filterTasks(status) {
    // Highlight active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    loadTasks(status);
}

// === SECTION 8: Update task counter ===
async function updateCounter() {
    try {
        const res = await fetch('/api/tasks');
        const allTasks = await res.json();

        const total = allTasks.length;
        const done = allTasks.filter(t => t.completed).length;
        const active = total - done;

        document.getElementById('count-total').textContent = total;
        document.getElementById('count-active').textContent = active;
        document.getElementById('count-done').textContent = done;
        document.getElementById('nav-count').textContent = `${total} task${total !== 1 ? 's' : ''}`;
    } catch (err) {
        console.error('Counter update failed:', err);
    }
}

// Check if list is empty after deletion
function checkEmpty() {
    const container = document.getElementById('task-list');
    if (container.querySelectorAll('.task-card').length === 0) {
        container.innerHTML = '<p class="empty-msg">No tasks yet! Add your first task above. 🎯</p>';
    }
}

// Show a visible error message to the user
function showError(msg) {
    const existing = document.getElementById('global-error');
    if (existing) existing.remove();

    const el = document.createElement('p');
    el.id = 'global-error';
    el.className = 'global-error';
    el.textContent = '⚠️ ' + msg;
    document.querySelector('main').prepend(el);

    setTimeout(() => el.remove(), 4000); // Auto-hide after 4 seconds
}

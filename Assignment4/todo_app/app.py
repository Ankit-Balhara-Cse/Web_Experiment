# app.py
# Name: Your Name
# Roll Number: Your Roll Number
# Date: 2025

from flask import Flask, render_template, request, jsonify, abort
from datetime import datetime

app = Flask(__name__)

# In-memory task store (resets on server restart — intentional)
tasks = []
next_id = 1


# Route 1 — Serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')


# Route 2 — GET all tasks (with optional ?status=active|completed filter)
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    status = request.args.get('status')  # e.g. ?status=active
    if status == 'active':
        result = [t for t in tasks if not t['completed']]
    elif status == 'completed':
        result = [t for t in tasks if t['completed']]
    else:
        result = tasks
    return jsonify(result), 200


# Route 3 — POST create a new task
@app.route('/api/tasks', methods=['POST'])
def create_task():
    global next_id
    data = request.json

    # Validate title
    if not data or not data.get('title', '').strip():
        return jsonify({'error': 'Title is required'}), 400

    # Validate priority
    priority = data.get('priority', 'medium')
    if priority not in ['low', 'medium', 'high']:
        priority = 'medium'

    new_task = {
        'id': next_id,
        'title': data['title'].strip(),
        'description': data.get('description', '').strip(),
        'priority': priority,
        'completed': False,
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    tasks.append(new_task)
    next_id += 1
    return jsonify(new_task), 201


# Route 4 — PUT update a task by id
@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task is None:
        abort(404)

    data = request.json
    if 'title' in data:
        task['title'] = data['title'].strip()
    if 'description' in data:
        task['description'] = data['description'].strip()
    if 'priority' in data and data['priority'] in ['low', 'medium', 'high']:
        task['priority'] = data['priority']
    if 'completed' in data:
        task['completed'] = data['completed']

    return jsonify(task), 200


# Route 5 — PATCH toggle task completion
@app.route('/api/tasks/<int:task_id>/toggle', methods=['PATCH'])
def toggle_task(task_id):
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task is None:
        abort(404)
    task['completed'] = not task['completed']
    return jsonify(task), 200


# Route 6 — DELETE a task by id
@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task is None:
        abort(404)
    tasks = [t for t in tasks if t['id'] != task_id]
    return '', 204


if __name__ == '__main__':
    app.run(debug=True)

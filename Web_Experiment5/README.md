# Simple Blog — Flask CRUD Application
### Experiment 5

A minimal blog application built with Flask demonstrating full **Create, Read, Update, Delete** operations using in-memory storage (no database required).

---

## Project Structure

```
simple_blog/
├── app.py                  # Flask application (all routes)
├── templates/
│   ├── base.html           # Base layout with nav & footer
│   ├── index.html          # Home page — list all posts
│   ├── create.html         # Create new post form
│   └── edit.html           # Edit existing post form
├── static/
│   └── style.css           # Optional supplementary CSS
└── README.md
```

---

## Setup & Run

### 1. Create and activate a virtual environment (optional)
```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
```

### 2. Install Flask
```bash
pip install flask
```

### 3. Run the app
```bash
python app.py
```

### 4. Open in browser
```
http://127.0.0.1:5000
```

---

## Features (Tasks)

| Task | Feature | Route |
|------|---------|-------|
| 1 | Project setup & structure | — |
| 2 | Flask app initialisation | `/` |
| 3 | Create new post | `/create` |
| 4 | Read & display all posts | `/` |
| 5 | Update/edit post | `/edit/<id>` |
| 6 | Delete post | `/delete/<id>` |
| 7 | Styling & navigation | base.html |

---

## Notes
- Posts are stored in a Python list in memory — they reset when the server restarts.
- Delete uses a `<form method="POST">` (not a plain link) to prevent accidental deletion.
- All routes redirect back to `/` after a write operation.

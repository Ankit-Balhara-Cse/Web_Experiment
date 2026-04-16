# Contact Management System — Flask CRUD
### Experiment 6

A Flask web application for managing contacts with full **Create, Read, Update, Delete** and **Search** functionality. No database required — contacts stored in-memory.

---

## Project Structure

```
contact_management_system/
├── app.py                      # Flask app — all routes & logic
├── templates/
│   ├── base.html               # Shared layout, nav, CSS
│   ├── index.html              # Home — contact table + search
│   ├── add_contact.html        # Add new contact form
│   └── edit_contact.html       # Edit existing contact form
├── static/
│   └── style.css               # Supplementary CSS
└── README.md
```

---

## Setup & Run

```bash
# 1. (Optional) Virtual environment
python -m venv venv
source venv/bin/activate       # macOS/Linux
venv\Scripts\activate          # Windows

# 2. Install Flask
pip install flask

# 3. Run
python app.py

# 4. Open browser
# http://127.0.0.1:5000
```

---

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List all contacts (+ search via `?q=`) |
| GET | `/add` | Show add-contact form |
| POST | `/add` | Save new contact |
| GET | `/edit/<id>` | Show pre-filled edit form |
| POST | `/edit/<id>` | Save updated contact |
| POST | `/delete/<id>` | Delete contact, redirect home |

---

## Tasks Completed

| Task | Feature |
|------|---------|
| 1 | Project structure & header comments |
| 2 | Flask init, home route, in-memory storage |
| 3 | Add contact with validation |
| 4 | Contact table with name, phone, email |
| 5 | Edit/update with pre-filled form |
| 6 | Delete with POST form & confirmation |
| 7 ✨ | Search by name/phone + CSS styling |

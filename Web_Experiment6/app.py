from flask import Flask, render_template, request, redirect, url_for

# ── App initialisation ───────────────────────────────────────
app = Flask(__name__)

# ── In-memory contact storage ────────────────────────────────
# Each contact is a dict: id, name, phone, email
contacts = [
    {"id": 1, "name": "Alice Johnson",  "phone": "9876543210", "email": "alice@example.com"},
    {"id": 2, "name": "Bob Smith",      "phone": "9123456780", "email": "bob@example.com"},
    {"id": 3, "name": "Carol Williams", "phone": "9001234567", "email": "carol@example.com"},
]

# Auto-incrementing ID counter
next_id = 4


# ── Helper ───────────────────────────────────────────────────
def find_contact(contact_id):
    """Return the contact dict matching contact_id, or None."""
    return next((c for c in contacts if c["id"] == contact_id), None)


# ── Route 1: Home – list (and search) all contacts ───────────
@app.route("/")
def index():
    """Display all contacts; filter by search query if provided."""
    query = request.args.get("q", "").strip().lower()   # Task 7: search

    if query:
        # Search by name OR phone (case-insensitive substring match)
        filtered = [
            c for c in contacts
            if query in c["name"].lower() or query in c["phone"]
        ]
    else:
        filtered = contacts

    return render_template("index.html", contacts=filtered, query=query)


# ── Route 2: Add contact ─────────────────────────────────────
@app.route("/add", methods=["GET", "POST"])
def add_contact():
    """Show blank form (GET) or save a new contact (POST)."""
    global next_id
    error = None

    if request.method == "POST":
        name  = request.form.get("name",  "").strip()
        phone = request.form.get("phone", "").strip()
        email = request.form.get("email", "").strip()

        # Validate: all fields required
        if not name or not phone or not email:
            error = "All fields are required."
        else:
            contacts.append({"id": next_id, "name": name,
                              "phone": phone, "email": email})
            next_id += 1
            return redirect(url_for("index"))

    return render_template("add_contact.html", error=error)


# ── Route 3: Edit contact ────────────────────────────────────
@app.route("/edit/<int:contact_id>", methods=["GET", "POST"])
def edit_contact(contact_id):
    """Pre-fill edit form (GET) or save updated contact (POST)."""
    contact = find_contact(contact_id)
    if contact is None:
        return redirect(url_for("index"))

    error = None

    if request.method == "POST":
        name  = request.form.get("name",  "").strip()
        phone = request.form.get("phone", "").strip()
        email = request.form.get("email", "").strip()

        if not name or not phone or not email:
            error = "All fields are required."
        else:
            contact["name"]  = name
            contact["phone"] = phone
            contact["email"] = email
            return redirect(url_for("index"))

    return render_template("edit_contact.html", contact=contact, error=error)


# ── Route 4: Delete contact ──────────────────────────────────
@app.route("/delete/<int:contact_id>", methods=["POST"])
def delete_contact(contact_id):
    """Remove a contact and redirect to home."""
    global contacts
    contacts = [c for c in contacts if c["id"] != contact_id]
    return redirect(url_for("index"))


# ── Entry point ──────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True)

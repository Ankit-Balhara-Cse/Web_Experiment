from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)
app.secret_key = "event_secret_key"

events = [
    {"id": 1, "name": "Tech Fest 2025", "date": "2025-07-15", "time": "10:00 AM", "venue": "Main Auditorium", "description": "Annual technology festival with workshops and competitions.", "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400", "category": "Technology", "rsvp": 5},
    {"id": 2, "name": "Music Night", "date": "2025-07-20", "time": "07:00 PM", "venue": "Open Air Theatre", "description": "An evening of live music performances by talented artists.", "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", "category": "Music", "rsvp": 12},
    {"id": 3, "name": "Hackathon 2025", "date": "2025-08-01", "time": "09:00 AM", "venue": "Computer Lab Block", "description": "24-hour coding hackathon for college students.", "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400", "category": "Technology", "rsvp": 8},
    {"id": 4, "name": "Cultural Carnival", "date": "2025-08-10", "time": "05:00 PM", "venue": "College Ground", "description": "Celebrate diversity with dance, food, and cultural performances.", "image": "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400", "category": "Cultural", "rsvp": 20},
]

next_id = 5

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/events")
def events_page():
    return render_template("events.html", events=events)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        phone = request.form.get("phone")
        event_id = request.form.get("event")
        tickets = request.form.get("tickets")

        for event in events:
            if str(event["id"]) == event_id:
                event["rsvp"] += int(tickets)
                break

        flash(f"Successfully registered {name} for the event!", "success")
        return redirect(url_for("register"))

    return render_template("register.html", events=events)

@app.route("/admin", methods=["GET", "POST"])
def admin():
    if request.method == "POST":
        password = request.form.get("password")
        if password == "admin123":
            session["admin"] = True
        else:
            flash("Wrong password!", "error")
    
    if not session.get("admin"):
        return render_template("admin_login.html")

    return render_template("admin.html", events=events)

@app.route("/admin/add", methods=["POST"])
def admin_add():
    global next_id
    if not session.get("admin"):
        return redirect(url_for("admin"))

    new_event = {
        "id": next_id,
        "name": request.form.get("name"),
        "date": request.form.get("date"),
        "time": request.form.get("time"),
        "venue": request.form.get("venue"),
        "description": request.form.get("description"),
        "image": request.form.get("image") or "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
        "category": request.form.get("category"),
        "rsvp": 0
    }
    events.append(new_event)
    next_id += 1
    flash("Event added successfully!", "success")
    return redirect(url_for("admin"))

@app.route("/admin/delete/<int:event_id>")
def admin_delete(event_id):
    if not session.get("admin"):
        return redirect(url_for("admin"))

    global events
    events = [e for e in events if e["id"] != event_id]
    flash("Event deleted!", "success")
    return redirect(url_for("admin"))

@app.route("/admin/edit/<int:event_id>", methods=["GET", "POST"])
def admin_edit(event_id):
    if not session.get("admin"):
        return redirect(url_for("admin"))

    event = next((e for e in events if e["id"] == event_id), None)
    if not event:
        return redirect(url_for("admin"))

    if request.method == "POST":
        event["name"] = request.form.get("name")
        event["date"] = request.form.get("date")
        event["time"] = request.form.get("time")
        event["venue"] = request.form.get("venue")
        event["description"] = request.form.get("description")
        event["image"] = request.form.get("image")
        event["category"] = request.form.get("category")
        flash("Event updated!", "success")
        return redirect(url_for("admin"))

    return render_template("edit_event.html", event=event)

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin", None)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)

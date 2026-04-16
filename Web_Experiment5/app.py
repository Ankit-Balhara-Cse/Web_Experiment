from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


posts = [
    {
        "id": 1,
        "title": "Welcome to Simple Blog",
        "content": "This is your first blog post! Use the navigation above to create, edit, or delete posts. Flask makes building web apps fun and straightforward."
    },
    {
        "id": 2,
        "title": "Getting Started with Flask",
        "content": "Flask is a lightweight Python web framework. It gives you the tools to build web applications quickly without unnecessary complexity. Perfect for projects like this blog!"
    },
]

next_id = 3


@app.route("/")
def index():
    """Display all blog posts on the home page."""
    return render_template("index.html", posts=posts)


@app.route("/create", methods=["GET", "POST"])
def create():
    """Show creation form (GET) or save a new post (POST)."""
    global next_id

    if request.method == "POST":
        title   = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        if title and content:
            posts.append({"id": next_id, "title": title, "content": content})
            next_id += 1

        return redirect(url_for("index"))

    return render_template("create.html")


@app.route("/edit/<int:post_id>", methods=["GET", "POST"])
def edit(post_id):
    """Pre-fill edit form (GET) or save updated post (POST)."""
    post = next((p for p in posts if p["id"] == post_id), None)

    if post is None:
        return redirect(url_for("index"))

    if request.method == "POST":
        title   = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        if title and content:
            post["title"]   = title
            post["content"] = content

        return redirect(url_for("index"))

    return render_template("edit.html", post=post)


@app.route("/delete/<int:post_id>", methods=["POST"])
def delete(post_id):
    """Remove the selected post and redirect to home."""
    global posts
    posts = [p for p in posts if p["id"] != post_id]
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)

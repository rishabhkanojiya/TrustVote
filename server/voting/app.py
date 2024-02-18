from flask import Flask, render_template, request, redirect, url_for
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

postgres_uri = os.getenv("POSTGRES_BILL_SPLIT_READ_WRITE")

print("host", postgres_uri)
app = Flask(__name__)


# Connect to PostgreSQL
def connect_db():
    try:
        conn = psycopg2.connect(postgres_uri)
        print("Connected to the database successfully.")
        return conn
    except psycopg2.OperationalError as e:
        print(f"Unable to connect to the database. Error: {e}")
        raise e


# Initialize the database table
def init_db():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            description TEXT NOT NULL
        )
    """
    )
    conn.commit()
    conn.close()


# Home route to display tasks
@app.route("/")
def index():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks ORDER BY id")
    tasks = cursor.fetchall()
    conn.close()
    return render_template("index.html", tasks=tasks)


# Add new task route
@app.route("/add", methods=["POST"])
def add():
    new_task = request.form["task"]
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (description) VALUES (%s)", (new_task,))
    conn.commit()
    conn.close()
    return redirect(url_for("index"))


# Run the application
if __name__ == "__main__":
    # Initialize the database
    init_db()

    # Run the Flask app
    app.run(debug=True)

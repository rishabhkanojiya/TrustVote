from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Database connection parameters
dbname = "be-e-voting"
user = "postgres"
password = "postgres"
host = "localhost"

# Connect to the database
conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host)
cursor = conn.cursor()

@app.route('/create_table_election_candidates', methods=['POST'])
def create_table_election_candidates():
    try:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS ELECTION_CANDIDATES (
                candidate_id SERIAL PRIMARY KEY,
                candidate_name VARCHAR NOT NULL,
                candidate_info VARCHAR,
                candidate_creation_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        return jsonify({'message': 'Table created successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error creating table 'ELECTION_CANDIDATES': {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
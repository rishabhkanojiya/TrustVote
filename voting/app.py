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

@app.route('/create_election_candidates_table', methods=['POST'])
def create_election_candidates_table():
    try:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS ELECTION_CANDIDATES (
                candidate_id SERIAL PRIMARY KEY,
                candidate_name VARCHAR NOT NULL,
                candidate_info VARCHAR,
                candidate_party VARCHAR,
                candidate_creation_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        return jsonify({'message': 'Table created successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error creating table 'ELECTION_CANDIDATES': {str(e)}"}), 500
    
@app.route('/create_election_table', methods=['POST'])
def create_election_table():
    try:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS ELECTION (
                election_id SERIAL PRIMARY KEY,
                election_name VARCHAR,
                election_type VARCHAR,
                election_start_date DATE,
                election_end_date DATE,
                election_state VARCHAR,
                election_city VARCHAR
            )
        ''')
        conn.commit()
        return jsonify({'message': 'Table created successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error creating table 'ELECTION_CANDIDATES': {str(e)}"}), 500

@app.route('/create_voting_information_table', methods=['POST'])
def create_voting_information_table():
    try:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS VOTING_INFORMATION (
                voting_id SERIAL PRIMARY KEY,
                voter_ssn INT NOT NULL,
                voting_election_id INT NOT NULL,
                voting_candidate_id INT NOT NULL,
                voting_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (voting_election_id) REFERENCES ELECTION(election_id),
                FOREIGN KEY (voting_candidate_id) REFERENCES ELECTION_CANDIDATES(candidate_id)
            )
        ''')
        conn.commit()
        return jsonify({'message': 'Table created successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error creating table 'ELECTION_CANDIDATES': {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Database connection parameters
dbname = "be-e-voting"
user = "vishal"
password = "12345678"
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
                candidate_type VARCHAR,
                candidate_location VARCHAR,
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

# insertion API's
@app.route('/bulk_insert_election_candidates', methods=['POST'])
def bulk_insert_election_candidates():
    records = request.json  # Expecting a list of records from request body
    sql_query = '''
        INSERT INTO ELECTION_CANDIDATES (candidate_name, candidate_info, candidate_party, candidate_type, candidate_location)
        VALUES (%s, %s, %s, %s, %s)
    '''
    try:
        # Make sure the tuple matches the fields in the INSERT statement
        cursor.executemany(sql_query, [(rec['candidate_name'], rec['candidate_info'], rec['candidate_party'], rec['candidate_type'], rec['candidate_location']) for rec in records])
        conn.commit()
        return jsonify({'message': f'{len(records)} records inserted successfully into ELECTION_CANDIDATES'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error inserting records into 'ELECTION_CANDIDATES': {str(e)}"}), 500


@app.route('/bulk_insert_election', methods=['POST'])
def bulk_insert_election():
    records = request.json  # Expecting a list of records from request body
    sql_query = '''
        INSERT INTO ELECTION (election_name, election_type, election_start_date, election_end_date, election_state, election_city)
        VALUES (%s, %s, %s, %s, %s, %s)
    '''
    try:
        cursor.executemany(sql_query, [(rec['election_name'], rec['election_type'], rec['election_start_date'], rec['election_end_date'], rec['election_state'], rec['election_city']) for rec in records])
        conn.commit()
        return jsonify({'message': f'{len(records)} records inserted successfully into ELECTION'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error inserting records into 'ELECTION': {str(e)}"}), 500

@app.route('/bulk_insert_voting_information', methods=['POST'])
def bulk_insert_voting_information():
    records = request.json  # Expecting a list of records from request body
    sql_query = '''
        INSERT INTO VOTING_INFORMATION (voter_ssn, voting_election_id, voting_candidate_id)
        VALUES (%s, %s, %s)
    '''
    try:
        cursor.executemany(sql_query, [(rec['voter_ssn'], rec['voting_election_id'], rec['voting_candidate_id']) for rec in records])
        conn.commit()
        return jsonify({'message': f'{len(records)} records inserted successfully into VOTING_INFORMATION'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error inserting records into 'VOTING_INFORMATION': {str(e)}"}), 500


# Get Request
@app.route('/get_election_candidates', methods=['GET'])
def get_election_candidates():
    try:
        cursor.execute('''
            SELECT candidate_id, candidate_name, candidate_info, candidate_party, candidate_type, candidate_location
            FROM ELECTION_CANDIDATES
        ''')
        # Fetch all rows from the cursor
        rows = cursor.fetchall()

        # Convert fetched data into a list of dictionaries to serialize as JSON
        candidates = []
        for row in rows:
            candidates.append({
                'candidate_id': row[0],
                'candidate_name': row[1],
                'candidate_info': row[2],
                'candidate_party': row[3],
                'candidate_type': row[4],
                'candidate_location': row[5],
            })

        return jsonify(candidates), 200
    except Exception as e:
        return jsonify({'error': f"Error fetching records from 'ELECTION_CANDIDATES': {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
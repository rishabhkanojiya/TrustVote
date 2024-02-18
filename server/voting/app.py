from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime
import hashlib
import json
import pickle 

load_dotenv()

postgres_uri = "postgres://postgres:postgres@localhost:5432/be-e-voting"

print("host", postgres_uri)
app = Flask(__name__)
CORS(app)

def connect_db():
    try:
        conn = psycopg2.connect(postgres_uri)
        print("Connected to the database successfully.")
        return conn
    except psycopg2.OperationalError as e:
        print(f"Unable to connect to the database. Error: {e}")
        raise e

conn = connect_db()
cursor = conn.cursor()

# Blockchain implementation
class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_block(proof=1, previous_hash='0')

    def create_block(self, proof, previous_hash):
        block = {'index': len(self.chain) + 1,
                 'timestamp': str(datetime.datetime.now()),
                 'proof': proof,
                 'previous_hash': previous_hash}
        self.chain.append(block)
        return block

    def print_previous_block(self):
        return self.chain[-1]

    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False
        while check_proof is False:
            hash_operation = hashlib.sha256(
                str(new_proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:5] == '00000':
                check_proof = True
            else:
                new_proof += 1
        return new_proof

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def chain_valid(self, chain):
        previous_block = chain[0]
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index]
            if block['previous_hash'] != self.hash(previous_block):
                return False
            previous_proof = previous_block['proof']
            proof = block['proof']
            hash_operation = hashlib.sha256(
                str(proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:5] != '00000':
                return False
            previous_block = block
            block_index += 1
        return True
    
    def to_binary(self):  # Convert blockchain to binary format
        return pickle.dumps(self.chain)
    
    @classmethod
    def from_binary(cls, binary_data):  # Convert binary data to blockchain
        blockchain = cls()
        blockchain.chain = pickle.loads(binary_data)
        return blockchain

blockchain = Blockchain()

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
                candidate_blockchain BYTEA  -- Add the column to store blockchain data
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

@app.route('/initialize_candidate_blockchain', methods=['POST'])    
def initialize_candidate_blockchain():
    try:
        # Initialize a new blockchain instance
        candidate_blockchain = Blockchain()
        
        data = request.get_json()
        candidate_id = data[0]['candidate_id']

        # Convert the blockchain data to JSON string
        blockchain_data = candidate_blockchain.to_binary()

        # Update the candidate table with the blockchain data
        cursor.execute('''
            UPDATE ELECTION_CANDIDATES
            SET candidate_blockchain = %s
            WHERE candidate_id = %s
        ''', (blockchain_data, candidate_id))

        conn.commit()

        return jsonify({'message': 'Candidate blockchain initialized successfully.'}), 200
    except Exception as e:
        return jsonify({'error': f"Error initializing candidate blockchain: {str(e)}"}), 500

    
    
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

@app.route('/insert_voting_information', methods=['POST'])
def insert_voting_information():
    try:
        data = request.get_json()
        for record in data:
            voter_ssn = record.get('voter_ssn')
            voting_election_id = record.get('voting_election_id')
            voting_candidate_id = record.get('voting_candidate_id')
            current_timestamp = record.get('current_timestamp')

            if None in (voter_ssn, voting_election_id, voting_candidate_id, current_timestamp):
                return jsonify({'error': 'Incomplete voting information provided'}), 400

            # Create a string representing the voting information
            voting_info = f"{voter_ssn}-{voting_election_id}-{voting_candidate_id}-{current_timestamp}"

            # Hash the voting information using blockchain
            hashed_info = hashlib.sha256(voting_info.encode()).hexdigest()

            cursor.execute('''
                SELECT candidate_blockchain
                FROM ELECTION_CANDIDATES
                WHERE candidate_id = %s
            ''', (voting_candidate_id,))
            blockchain_data = cursor.fetchone()[0]

            candidate_blockchain = Blockchain.from_binary(blockchain_data)

            # Add the hashed voting information to the blockchain
            previous_block = candidate_blockchain.print_previous_block()
            previous_proof = previous_block['proof']
            proof = candidate_blockchain.proof_of_work(previous_proof)
            previous_hash = candidate_blockchain.hash(previous_block)
            candidate_blockchain.create_block(proof, previous_hash)

            # Update the candidate table with the updated blockchain data
            updated_blockchain_data = candidate_blockchain.to_binary()
            cursor.execute('''
                UPDATE ELECTION_CANDIDATES
                SET candidate_blockchain = %s
                WHERE candidate_id = %s
            ''', (updated_blockchain_data, voting_candidate_id))

        conn.commit()
        return jsonify({'message': 'Voting information inserted successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f"Error inserting voting information: {str(e)}"}), 500

@app.route('/get_candidate_votes', methods=['GET'])
def get_candidate_votes():
    data = request.get_json()
    candidate_id = data[0]['candidate_id']
    cursor.execute('''
        SELECT candidate_blockchain
        FROM ELECTION_CANDIDATES
        WHERE candidate_id = %s
    ''', (candidate_id,))
    blockchain_data = cursor.fetchone()[0]

    if blockchain_data:
        candidate_blockchain = Blockchain.from_binary(blockchain_data)
        vote_count = len(candidate_blockchain.chain) - 1
    else:
        vote_count = 0  # Candidate has received no votes

    return jsonify({'vote_count': vote_count})


if __name__ == "__main__":
    # Run the Flask app
    app.run(port=9069)
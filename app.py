from flask import Flask, jsonify, send_from_directory
import Matchups  # Import your script

app = Flask(__name__)

@app.route('/api/matchups', methods=['GET'])
def get_matchups():
    Matchups.games = Matchups.main()  # Assuming your script sets the games variable
    return jsonify(Matchups.games)

@app.route('/')
def serve_frontend():
    return send_from_directory('', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
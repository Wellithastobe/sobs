from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html')

@app.route('/logos/<path:filename>')
def logos(filename):
    """Serve logo files"""
    return send_from_directory('logos', filename)

@app.route('/media/<path:filename>')
def media(filename):
    """Serve media files (videos, etc.)"""
    return send_from_directory('media', filename)

if __name__ == '__main__':
    # For development only
    app.run(host='127.0.0.1', port=5000, debug=True)

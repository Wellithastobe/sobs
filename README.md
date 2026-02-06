# Cardz.lol - Flask Application with Nginx

A modern, animated website built with Flask and served through Nginx.

## Project Structure

```
sobs.lol/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── nginx.conf            # Nginx configuration
├── cardz-lol.service     # Systemd service file
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── styles.css        # Stylesheet
│   └── script.js         # JavaScript
└── logos/
    └── logo.png          # Site logo
```

## Setup Instructions

### 1. Install Python Dependencies

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Development Server

Run the Flask development server:

```bash
python app.py
```

The site will be available at `http://127.0.0.1:5000`

### 3. Production Setup with Nginx

#### Update Nginx Configuration

1. Edit `nginx.conf` and replace `/path/to/sobs.lol` with your actual project path:
   ```bash
   # Example: /home/user/sobs.lol or C:\Users\Sebastian\Documents\sobs.lol
   ```

2. Copy the configuration to Nginx sites:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/cardz-lol
   sudo ln -s /etc/nginx/sites-available/cardz-lol /etc/nginx/sites-enabled/
   ```

3. Test Nginx configuration:
   ```bash
   sudo nginx -t
   ```

4. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

#### Setup Systemd Service (Linux)

1. Edit `cardz-lol.service` and update paths:
   - `WorkingDirectory`: Your project path
   - `Environment PATH`: Path to your virtual environment's bin directory
   - `ExecStart`: Path to gunicorn in your virtual environment

2. Copy service file:
   ```bash
   sudo cp cardz-lol.service /etc/systemd/system/
   ```

3. Enable and start the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable cardz-lol
   sudo systemctl start cardz-lol
   ```

4. Check status:
   ```bash
   sudo systemctl status cardz-lol
   ```

### 4. SSL/HTTPS Setup (Optional but Recommended)

1. Obtain SSL certificate (Let's Encrypt recommended):
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d cardz.lol -d www.cardz.lol
   ```

2. Uncomment HTTPS server block in `nginx.conf`

3. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

## Configuration

### Environment Variables

Create a `.env` file (or set environment variables) for production:

```bash
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
```

### Gunicorn Workers

Adjust the number of workers in `cardz-lol.service` based on your server:
- `workers = (2 x CPU cores) + 1` is a good starting point

## Troubleshooting

### Check Flask App Logs
```bash
sudo journalctl -u cardz-lol -f
```

### Check Nginx Logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Test Flask App Directly
```bash
curl http://127.0.0.1:5000
```

## Windows Setup (Development)

For Windows development, you can use:

1. Install Python and Flask
2. Run `python app.py` directly
3. Access at `http://localhost:5000`

For production on Windows, consider:
- Using IIS with HttpPlatformHandler
- Or deploying to a Linux server (recommended)

## Features

- ✅ Modern dark theme with purple accents
- ✅ Animated scroll-triggered video card
- ✅ Responsive design
- ✅ Optimized static file serving through Nginx
- ✅ Production-ready with Gunicorn
- ✅ Systemd service for auto-restart

## License

MIT

# Deploying a Flask Application on PythonAnywhere

## 1. Set Up Virtual Environment

First, open a Bash console on PythonAnywhere and create a virtual environment:

```bash
mkvirtualenv --python=/usr/bin/python3.9 myflaskapp
```

To activate the virtual environment in future sessions:
```bash
workon myflaskapp
```

## 2. Install Required Packages

With your virtual environment active, install Flask and other dependencies:

```bash
pip install flask
pip install -r requirements.txt  # if you have a requirements.txt file
```

## 3. Create Your Flask Application Structure

Create a new directory and set up your application:

```bash
mkdir myflaskapp
cd myflaskapp
```

Create the following structure:
```
myflaskapp/
├── flask_app.py
├── static/
└── templates/
```

## 4. Create the Flask Application

In `flask_app.py`, add your Flask application code:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello from PythonAnywhere!'

# Only for local testing
if __name__ == '__main__':
    app.run()
```

## 5. Configure the Web App on PythonAnywhere

1. Go to the Web tab in your PythonAnywhere dashboard
2. Click "Add a new web app"
3. Choose your domain name (yourname.pythonanywhere.com)
4. Select "Manual Configuration"
5. Choose Python version (same as your virtualenv)

## 6. Configure the WSGI File

In the Web tab, find and click on the WSGI configuration file link. Replace its contents with:

```python
import sys
path = '/home/yourusername/myflaskapp'
if path not in sys.path:
    sys.path.append(path)

from flask_app import app as application

# Add any environment variables your app needs
import os
os.environ['SECRET_KEY'] = 'your-secret-key'
```

## 7. Configure Virtual Environment Path

In the Web tab:
1. Set the virtual environment path:
   ```
   /home/yourusername/.virtualenvs/myflaskapp
   ```

2. Set the source code directory:
   ```
   /home/yourusername/myflaskapp
   ```

## 8. Configure Static Files (Optional)

If your app uses static files, add in the Web tab:
- URL: /static/
- Directory: /home/yourusername/myflaskapp/static

## 9. Security Settings

1. Generate a secure secret key:
```python
import secrets
secrets.token_hex(16)
```

2. Add it to your Flask app:
```python
app.secret_key = 'your-generated-key'
```

## 10. Final Steps

1. Reload your web app using the green button in the Web tab
2. Check the error logs if something isn't working
3. Visit your site at yourusername.pythonanywhere.com

## Troubleshooting

Common issues and solutions:

1. **Import Errors**
   - Verify your virtualenv is correctly set
   - Check all required packages are installed
   - Confirm WSGI file paths are correct

2. **500 Errors**
   - Check the error logs in the Web tab
   - Verify file permissions
   - Ensure all required files exist

3. **Static Files Not Loading**
   - Verify static files configuration
   - Check file paths and permissions
   - Ensure files are in correct directory

## Maintenance

- Regularly update packages: `pip install --upgrade -r requirements.txt`
- Monitor your app's error logs
- Keep track of your app's resource usage
- Backup your code regularly

Remember to replace `yourusername` with your actual PythonAnywhere username throughout this guide.

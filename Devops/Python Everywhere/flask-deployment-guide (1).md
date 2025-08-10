# Deploying a Flask App to PythonAnywhere

## 1. Set Up a Virtual Environment

1. Open a Bash console in PythonAnywhere:
   - Go to the Dashboard
   - Click on "Consoles"
   - Start a new Bash console

2. Create and activate a virtual environment:
```bash
mkvirtualenv --python=/usr/bin/python3.9 myflaskapp
# The environment will be activated automatically
# In the future, use: workon myflaskapp
```

## 2. Clone Your GitHub Repository

1. Navigate to your desired directory:
```bash
cd ~
```

2. Clone your repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

## 3. Install Dependencies

1. Install required packages:
```bash
pip install flask
pip install -r requirements.txt  # If you have a requirements.txt file
```

## 4. Configure the Web App

1. Go to the "Web" tab in PythonAnywhere
2. Click "Add a new web app"
3. Choose your domain name (yourusername.pythonanywhere.com)
4. Select "Manual Configuration"
5. Choose Python version (match your local environment)

## 5. Set Up the WSGI Configuration

1. Navigate to the WSGI configuration file:
   - Click on the WSGI configuration file link in the Web tab
   - Replace the contents with:

```python
import sys
import os

# Add your project directory to the sys.path
path = '/home/yourusername/your-repo-name'
if path not in sys.path:
    sys.path.append(path)

# Point to your virtual environment
os.environ['VIRTUAL_ENV'] = '/home/yourusername/.virtualenvs/myflaskapp'
os.environ['PATH'] = '/home/yourusername/.virtualenvs/myflaskapp/bin:' + os.environ['PATH']

from flask_app import app as application  # Update 'flask_app' to your app's name
```

## 6. Configure Virtual Environment Path

1. In the Web tab, under "Virtualenv":
   - Enter: `/home/yourusername/.virtualenvs/myflaskapp`

## 7. Configure Static Files (if needed)

1. In the Web tab, under "Static Files":
   - URL: `/static/`
   - Directory: `/home/yourusername/your-repo-name/static`

## 8. Final Configuration

1. Set environment variables (if needed):
   - Go to the Web tab
   - Scroll to "Environment variables"
   - Add any necessary environment variables

2. Update working directory:
   - Source code: `/home/yourusername/your-repo-name`
   - Working directory: `/home/yourusername/your-repo-name`

## 9. Deploy and Test

1. Click the "Reload" button in the Web tab
2. Visit your site at yourusername.pythonanywhere.com

## Troubleshooting

1. Check the error logs in the Web tab
2. Common issues:
   - Module import errors: Check your virtual environment
   - File permission issues: Use `chmod` to set correct permissions
   - Path errors: Verify all paths in WSGI configuration

## Updating Your App

1. Pull updates from GitHub:
```bash
cd ~/your-repo-name
git pull origin main  # or master, depending on your branch name
```

2. Reload the web app from the Web tab

## Maintenance Tips

- Regularly update dependencies: `pip install -U -r requirements.txt`
- Monitor your app's logs for errors
- Keep your virtual environment clean and updated
- Regularly commit and push changes to GitHub

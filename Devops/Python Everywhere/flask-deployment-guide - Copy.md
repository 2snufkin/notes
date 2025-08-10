# Deploying a Flask Application on PythonAnywhere With Hooks

1. First, deploy your app to PythonAnywhere following these steps:
   ```bash
   # On PythonAnywhere console
   cd ~
   git clone https://github.com/yourusername/your-repo.git
   mkvirtualenv --python=/usr/bin/python3.9 your_virtualenv_name
   # In the future, use: workon myflaskapp
   cd your-repo
   pip install -r requirements.txt
   ```

2. Set up your PythonAnywhere API token:
   - Go to Account → API token → Create new API token
   - Copy the token for the next step

3. Create the deployment files:
   - Save the deployment script as `deployment_script.py`
   - Save the config file as `deploy_config.ini`
   - Install the requests library: `pip install requests`
   - Update `deploy_config.ini` with your actual values

4. Set up the Git hook:
   ```bash
   # On your local machine
   cd your-repository
   mkdir -p .git/hooks
   # Copy the post-receive hook content to .git/hooks/post-receive
   chmod +x .git/hooks/post-receive
   ```

5. Make the hook executable:
   ```bash
   chmod +x .git/hooks/post-receive
   ```

Now, every time you push to your repository, the hook will:
1. Trigger the deployment script
2. Pull the latest changes on PythonAnywhere
3. Reload your web application
4. Log the deployment

To test the setup:
```bash
# Make a change to your code
git add .
git commit -m "Test automatic deployment"
git push origin main
```

A few important notes:
1. Make sure to replace all placeholder values (usernames, paths, etc.) with your actual values
2. Keep your API token secure and never commit it to version control
3. The script assumes your main branch is called 'main' - adjust if you use 'master' or another name
4. Add error handling and logging as needed for your specific use case

Would you like me to explain any part of this setup in more detail?



## deployment_script.py

```python
# deployment_script.py
import os
import sys
import requests
from configparser import ConfigParser

def load_config():
    config = ConfigParser()
    config.read('deploy_config.ini')
    return config['PythonAnywhere']

def deploy_to_pythonanywhere():
    config = load_config()
    
    # PythonAnywhere API token and username
    api_token = config['api_token']
    username = config['username']
    
    headers = {
        'Authorization': f'Token {api_token}'
    }
    
    # Pull latest changes
    pull_url = f'https://www.pythonanywhere.com/api/v0/user/{username}/consoles/'
    pull_data = {
        'executable': 'bash',
        'arguments': f'-c "cd ~/{config["repo_name"]} && git pull origin main"'
    }
    
    # Reload the web app
    reload_url = f'https://www.pythonanywhere.com/api/v0/user/{username}/webapps/{config["domain_name"]}/reload/'
    
    try:
        # Execute git pull
        pull_response = requests.post(pull_url, headers=headers, json=pull_data)
        pull_response.raise_for_status()
        
        # Reload the web app
        reload_response = requests.post(reload_url, headers=headers)
        reload_response.raise_for_status()
        
        print("Deployment successful!")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"Deployment failed: {str(e)}")
        return False

if __name__ == "__main__":
    deploy_to_pythonanywhere()

```

```ini
# deploy_config.ini
[PythonAnywhere]
api_token = your_api_token_here
username = your_pythonanywhere_username
domain_name = your_app_domain
repo_name = your_repository_name

```

```bash
#!/bin/bash
# .git/hooks/post-receive

# Activate virtual environment if needed
source ~/.virtualenvs/your_virtualenv_name/bin/activate

# Navigate to your project directory
cd /path/to/your/repository

# Run the deployment script
python deployment_script.py

# Log the deployment
echo "Deployment triggered at $(date)" >> deployment.log

```

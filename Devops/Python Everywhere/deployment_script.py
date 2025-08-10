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

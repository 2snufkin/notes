#!/bin/bash
# .git/hooks/post-receive

# Navigate to your project directory
cd /path/to/your/repository

# Run the deployment script
python deployment_script.py

# Log the deployment
echo "Deployment triggered at $(date)" >> deployment.log

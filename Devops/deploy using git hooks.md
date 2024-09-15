## Deploying a Flask Application from Your Local Machine to an EC2 Instance with Docker and Git Hooks

This document provides a comprehensive guide on how to deploy a Flask application from your local machine to an AWS EC2 instance running Ubuntu using Docker and Git hooks. The guide is designed for users unfamiliar with Docker and assumes you have not yet created a Docker image for your Flask app. It also outlines the process of automating deployment via Git hooks.

### Prerequisites

1. **AWS EC2 Instance**: You have an Ubuntu instance running on EC2.
2. **SSH Setup**: You have already set up SSH access to the EC2 instance.
3. **Docker Installed on EC2**: Docker is already installed on the EC2 instance.

### Overview of the Steps

1. Create a Flask application and Dockerize it.
2. Set up a Git repository for your Flask app with hooks to automate deployment.
3. Push your code to the Git repository, triggering a deployment to the EC2 instance.

---

## Step 1: Create and Dockerize the Flask Application

If you already have a Flask app, you can skip to the Docker part. Otherwise, follow the steps below to set up a basic Flask app and Dockerize it.



### 1.2 Dockerize the Flask Application

Next, you'll create a Dockerfile, which is a script containing instructions to build a Docker image.

In the `flask-app` directory, create a file called `Dockerfile`:

```dockerfile
# Use the official Python image as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the rest of the app's code into the container
COPY . .

# Expose the port the Flask app will run on
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
```

This Dockerfile does the following:

- Uses the official `python:3.10-slim` image.
- Sets `/app` as the working directory.
- Installs the necessary Python dependencies from `requirements.txt`.
- Copies the app code into the container.
- Exposes port `5000`.
- Runs the `app.py` file, which starts the Flask application.

### 1.3 Build and Test the Docker Image Locally

To build and run the Docker image locally:

1. Make sure Docker is installed and running on your machine.
2. Build the Docker image:

```bash
docker build -t <appname> .
```

3. Run the Docker container:

```bash
docker run -p 5000:5000 <appname>
```

This will run your Flask app inside a Docker container, and it should be accessible at `http://localhost:5000`.

### 1.4 Push the Docker Image to Docker Hub (Optional)

If you want to host your Docker image on Docker Hub for easier deployment, you need to push it to a repository there.

1. Log in to Docker Hub:

```bash
docker login
```

2. Tag your Docker image:

```bash
docker tag flask-app <your-dockerhub-username>/flask-app:latest
```

3. Push the image:

```bash
docker push <your-dockerhub-username>/flask-app:latest
```

This step is optional, but it simplifies pulling the image on your EC2 instance later.

---

## Step 2: Set Up Git Repository and Git Hooks

Next, you'll set up a Git repository for your Flask project and create a Git hook to automatically deploy to EC2 when you push changes.

### 2.1 Initialize a Git Repository

In your `flask-app` directory, initialize a Git repository:

```bash
git init
```

Add your files and commit the changes:

```bash
git add .
git commit -m "Initial commit of Flask app"
```

### 2.2 Set Up a Remote Git Repository on EC2

To set up a bare Git repository on your EC2 instance:

1. SSH into your EC2 instance.
2. Create a directory for your repository:

```bash
mkdir -p ~/flask-app.git
cd ~/flask-app.git
git init --bare
```

This creates a "bare" repository, meaning it won't have a working tree, but it will accept pushes from your local machine.

### 2.3 Create a Post-Receive Hook

To automate the deployment of your Flask app when you push to the EC2 server, you’ll create a Git hook on the EC2 instance.

In the `~/flask-app.git/hooks/` directory, create a file called `post-receive`:

```bash
nano ~/flask-app.git/hooks/post-receive
```

Add the following content to the `post-receive` hook:

```bash
#!/bin/bash

# Set the working directory where the Flask app will be deployed
WORK_DIR=~/flask-app

# Check if the directory exists, if not, create it
if [ ! -d "$WORK_DIR" ]; then
    mkdir -p "$WORK_DIR"
fi

# Move to the working directory
cd $WORK_DIR || exit

# Checkout the latest code into the working directory
git --work-tree=$WORK_DIR --git-dir=~/flask-app.git checkout -f

# Pull the latest Docker image (optional, only if using Docker Hub)
# docker pull <your-dockerhub-username>/flask-app:latest

# Build and run the Docker container
docker build -t flask-app .
docker stop flask-app || true
docker rm flask-app || true
docker run -d -p 5000:5000 --name flask-app flask-app
```

Make sure to give the `post-receive` hook execute permissions:

```bash
chmod +x ~/flask-app.git/hooks/post-receive
```

This hook will:

1. Move to the deployment directory (`~/flask-app`).
2. Force checkout the latest code that was pushed to the EC2 Git repository.
3. Build the Docker image and run it in detached mode, exposing it on port 5000.

### 2.4 Add the Remote Repository to Your Local Git

On your local machine, add the EC2 instance as a remote repository:

```bash
git remote add ec2 ssh://ec2-user@<your-ec2-ip>:<your-ec2-port>/~/flask-app.git
```

Replace `<your-ec2-ip>` and `<your-ec2-port>` with your EC2 instance's IP address and the SSH port (default is 22).

---

## Step 3: Deploy the Flask Application via Git Push

Now that the Git hooks are set up, you can deploy your Flask app by simply pushing to the EC2 instance.

1. Make changes to your Flask app locally.
2. Commit your changes.
3. Push the code to your EC2 instance:

```bash
git push ec2 master
```

When you push the code, the `post-receive` hook will be triggered, which will build and run your Docker container on the EC2 instance.

You should now be able to access your Flask application at `http://<your-ec2-ip>:5000`.

---

## Conclusion

By following this guide, you have successfully deployed a Flask application from your local machine to an EC2 instance using Docker and automated the deployment process with Git hooks. This setup ensures that each time you push code to the EC2 instance, it will automatically build a new Docker container and deploy the updated application.
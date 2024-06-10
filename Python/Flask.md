# Your First REST API

## Stats Codes 
**200:** OK. The request has succeeded. The server has fulfilled the request and sent back the requested content.
**301:**. Moved Permanently. The requested resource has been permanently moved to a new location. The client should update its URL to the new location.
**302:** Moved Temporarily. The requested resource has been temporarily moved to a different URL. The client should continue to use the original URL for future requests.
**400:** Bad Request. The server cannot process the request due to a client error, such as invalid syntax or missing parameters in the request.
**401:** Unauthorized. The request requires user authentication. The client must provide valid credentials (e.g., username and password) to access the resource.
**403:** Forbidden. The server understood the request, but the client does not have permission to access the requested resource.
**404:** Not Found. The server cannot find the requested resource. This is often returned when the requested URL does not exist on the server.
**500:** Internal Server Error. The server encountered an unexpected condition that prevented it from fulfilling the request. This could be due to a bug in the server-side code or a misconfiguration.
**502:** Bad Gateway. The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
**503:** Service Unavailable. The server is currently unable to handle the request due to temporary overloading or maintenance of the server. This is often used for server maintenance or when the server is overloaded.
**405:** Method Not Allowed. The request don't correspends to a known method/endpoint
**201:** Created. The request has been fulfilled, and a new resource has been created as a result of the request. This status code is typically used in response to POST requests when a new resource has been successfully created on the server.

## Initial Setup for a Flask App
1. create virtual env `python -m venv .venv`
2. `pip install flask`
3. Create Flask app 
```python
from flask import Flask

app = Flask(__name__)


```
4. If your terminal point to the folder where the app.py is found, run the app with `flask run`

## REST API Endpoint
You create endpoint via anootation.
**return:** When you return a dict inside a flask route python will convert it to json. It will stringify it since json is a string.
*Why dict:* Prefer returning a dictioner over a list ( a dict that contains the list) sint if you ant to scale and to add more info in the futre you won't need to change the front.
*json:* can contain a string representation of an object `{..}` or a list  `[]`. It better to return a non pretify presentation of the json since it can save a lot of bandwitch since there is less data (no spaces and new lines) transfer between the server and the client.
*status code:* you can return a status code seperated by ','
**Testing:** Use Insomnia or Postman
```python
@app.get("/...")
def method():
	return dict

@app.post("/...")
def method():
	return dict	, status_code

```

### Getting Data From The Request
**URL path:** You can fetch them using <type:name>. Then the name is passed to the endpoint's method for you to use.
**URL query parameters:** Query parameters can be accessed using the request's args attribute.
**Headers:**Sending data via custom header is a bit wierd. Header values can be accessed using the request's headers attribute.
**Form:** Form data can be accessed using the request's form attribute.
**json:** if the user send a json in the body and you want to fetch it `request.get_json()`, you will get a dict in return not a json.

```python
@app.get("/...")
def method():
	return dict

@app.post("/store/<string:name>/item") # fetching part of the URL
def create_item(name):  
	 param_value = request.args.get("param_name") # fetching URL query parameters
	 header_value = request.headers.get("Header-Name") # fetching Header value by key
	 form_value = request.form.get("field_name") # fetching Form value by key
	 json_data = request.get_json() #Fetching json string



	return dict	, status_code
```


# Introduction to Docker

## Theory
When you run a docker container it will be on a Linux OS. 
*Why Linux:* Most of the servers on the cloud running on Linux. So your container should be a Linux container.
**Container:** Each container has its storage and networking and uses the linux kernel. The container is based on instructions how to create it. An Image.
*Advantages:* They are much lightern and startup much faster than a Virtual Machine
*Kernel:* The base of the OS that interact with the Hardware
**Image:** A snapshot of source code, libraries, dependencies, tools  and everything that containers need for running (except the kernel). You build images with Dockerfile and image will be used to run one or more containers.

*Elements:* the language, what port to expose, cmd commends to run (like pip install), defention of working dir, copy all the source code to the working dir, and cmd
**Dockerfile:** A defenition of docker image. Instructions how to build it. 
**Layers:** Each instruction is a layer and it's cached. So if you re build the image and change only the source code, only the copy layer is excuted.
**Development:** When developing on Windows the way to use Docker is via Docker Desktop. It create Linux VM and run the container in this VM. 

## Creating Container
1. Create a Dockerfile
**From:** Specifies the base image you want to use. This can be an official image from Docker Hub or a custom image you've created.
**EXPOSE:**  Indicates which port the application inside the container will listen on. Note that this doesn't actually publish the port; it's just informational.
**WORKDIR:** : Go into a folder within the basic image where you will copy your app files into. subsequent commands will be executed here. 
**RUN:** Executes commands inside the container during the build process. You can use this to install dependencies, set up the environment, or perform any other necessary actions.
**COPY:** Copies files from the host machine into the container. You'll use this to add your application code and any other files needed for your application to run.
**CMD:** Specifies the command that should be run when the container starts. This is typically the command to start your application, but it can be anything you want the container to do by default. 

```
# Example for Flask app

FROM python:3.11
EXPOSE 5000
WORKDIR /app 
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . . 
CMD ["flask", "run", "--host", "0.0.0.0"]


```
```
# Define the basic image => FROM python:3.10
FROM <base_image>

# Open a port. Specify which port the app will listen on => EXPOSE 5000
EXPOSE <port_number>

# Go into a folder within the basic image where you will copy your app into
WORKDIR /app

# Install dependencies and set up environment if needed => pip install flask
RUN <actions>

# Copy your application files into the container: => COPY . .
COPY <source> <destination>

# Specify any commands needed to run your application => CMD ["flask", "run", "--host", "0.0.0.0"]
CMD <command_to_start_application>



```
2. `docker build -t {name} .`: t is for tagging the image
3. Use Docker desktop or cmd to run the container.
**Docker Desktop:** run the image (play buton). If you open the addtional setting you can custom
+ Container name
+ Local Host: Port forwarding. The local host is the port that we will be used in the browser to access the app. It will be forward to the port defined in the dockerfile.
**cmd:** `docker run -p {client_port}:{container_port} {image_name}`. use can use `d` to run it in the background.

## Run the API in Docker with Automatic Reloading and Debug Mode
**linux:**`docker run -dp 5005:5000 -w /app -v "$(pwd):/app" {docker_image}`
**windows:** `docker run -dp 5005:5000 -w /app -v "%cd%:/app" {docker_image}
`

1. `docker run`: This command is used to run a Docker container based on the specified Docker image.

2. `-dp 5005:5000`: These are options passed to the `docker run` command:
   - `-d`: This option stands for "detached" mode, which means the container runs in the background. It allows you to continue using your terminal after starting the container.
   - `-p 5005:5000`: This option maps port `5000` from the container to port `5005` on the host. It allows you to access the service running inside the container via `localhost:5005`.

3. `-w /app`: This option sets the working directory inside the container to `/app`. This can be helpful if your application expects to run from a specific directory. It's not directly related to hot-swapping but can aid in the overall setup of your containerized application.

4. `-v "$(pwd):/app"`: This option mounts the current directory (`$(pwd)`) on your host to the `/app` directory inside the container. It allows you to synchronize files between your host and the container. This is particularly useful for development purposes when you want changes made on your host to be reflected immediately inside the container, which is crucial for hot-swapping. The `-v` option, which mounts the current directory to `/app` inside the container, is crucial for hot-swapping. When you make changes to files on your host (for example, your application's source code), they are immediately reflected inside the container due to this volume mount. This allows you to achieve hot-swapping, where you can make code changes without needing to rebuild the Docker image or restart the container. The changes are picked up automatically by the running application inside the container, facilitating a smoother development experience.

5. `{docker_image}`: This is the name of the Docker image you want to run as a container. It specifies the base image from which the container will be instantiated.


# Flask-Smorest for More Efficient Development
Flask-Smorest is a Flask extension that simplifies building RESTful APIs. It facilitates the developer's job by automating API documentation generation and validation, allowing developers to focus more on writing clean, maintainable code and less on manually managing API documentation and validation.
1. Add flask-smorest and python-dotenv to the requirments.txt
2. Create a `.flaskenv` file: it will contain variables that you want flask to use when you start it up.
```text
FLASK_APP=app #the name of the main file
FLASK_DEBUG=1 # set the hot reload

```
**`abort()`:** Get two arg, status code and message. The abort method also exists in Flask but when you call the abort of Flask-Smorest it also add the documentation. 

## Blueprints and MethodViews in Flask
Blueprint is a feature provided by Flask to help organize larger applications into smaller, reusable components which can improve code organization and maintainability, especially as your application grows in size and complexity.Blueprints allow you to define sets of routes, templates, and static files in a way that can be registered with an application or even reused across multiple applications.



How to Write Marshmallow Schemas for Our API

How to Perform Data Validation with Marshmallow

Decorating Responses with Flask-Smorest


# Store Data in DQL Database with SQLAlchemy


# Many-to-Many Relationships with SQLAlchemy


# User Authentication with Flask-JWT-Extended


# Database Migrations with Alembic and Flask-Migrate


# Git Crash Course


# Deployments with Render.com


# Task Queues with rq and Sending Emails
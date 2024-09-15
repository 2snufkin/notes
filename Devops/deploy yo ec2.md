# Deploying a Flask app to an EC2 instance running Ubuntu:

## Prerequi
if its private account git will ask you for username and passowrd, when you will type the password it will say that its no longer supported
so use ssh key
1. generate one: ssh-keygen -t rsa -b 4096 -C "pini.tzr@gmail.com"
click enter and enter , the second enter is if you want to create Passphrase for another layer of security
2. eval "$(ssh-agent -s)": start the agent
3. ssh-add ~/.ssh/id_rsa: Add your SSH private key to the agent:
4. cat ~/.ssh/id_rsa.pub
5. Go to GitHub and log in.
6. Navigate to GitHub's SSH and GPG keys page.
7. Click "New SSH key."
8. Paste the copied key into the "Key" field, give it a descriptive title, and click "Add SSH key."

## 1. Clone the Flask App from a Git Repository using SSH
1. Clone using ssh
   ```bash
   git clone git@github.com:2snufkin/dev_tools.git
   ```
2. Navigate into the cloned directory:
   ```bash
   cd repository
   ```
## 2. Create virtuam env and install
you dont want to install depdency globally
- python3 -m venv venv
- source venv/bin/activate
- pip3 install -r requirements.txt
- nano run.py
   - **Modify the Flask app to listen on a specific port and IP (usually `0.0.0.0` to make it accessible externally).** Example configuration in your `app.py`:
     ```python
     if __name__ == '__main__':
         app.run(host='0.0.0.0', port=5000)
     ```

## Run the production server
- gunicorn --bind 0.0.0.0:5000 run:app

 ```bash
gunicorn --bind 0.0.0.0:5000 run:app
```
  
### 4. Set Environment Variables

1. **Set Environment Variables Temporarily:** Use `export` to set environment variables for the current session:
   ```bash
   export FLASK_ENV=production
   export SECRET_KEY=your_secret_key
   ```

2. **Set Environment Variables Permanently:**
   - **Edit the `.bashrc` or `.profile` file:**
     ```bash
     nano ~/.bashrc
     ```
   - **Add your environment variables:**
     ```bash
     export FLASK_ENV=production
     export SECRET_KEY=your_secret_key
     ```
   - **Reload the file:**
     ```bash
     source ~/.bashrc
     ```

### 5. Additional Crucial Steps

1. **Configure a Reverse Proxy:**
   - **Install and configure Nginx or Apache:** This allows you to route HTTP traffic to your Flask app and manage multiple apps on the same server.
     ```bash
     sudo apt install nginx
     ```
   - **Create an Nginx configuration file:**
     ```bash
     sudo nano /etc/nginx/sites-available/my_flask_app
     ```
     Example configuration:
     ```nginx
     server {
         listen 80;
         server_name your_domain_or_IP;

         location / {
             proxy_pass http://127.0.0.1:5000;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }
     }
     ```
   - **Enable the configuration and restart Nginx:**
     ```bash
     sudo ln -s /etc/nginx/sites-available/my_flask_app /etc/nginx/sites-enabled/
     sudo systemctl restart nginx
     ```

2. **Configure Security Groups:**
   - **Ensure your EC2 security group allows incoming traffic on the ports used by your app (e.g., port 80 for HTTP).**

3. **Use a Process Manager:**
   - **Install and configure a process manager like `supervisor` or `systemd` to keep your Flask app running in the background and automatically restart it if it crashes.**
     ```bash
     sudo apt install supervisor
     ```
   - **Create a configuration file for Supervisor:**
     ```bash
     sudo nano /etc/supervisor/conf.d/my_flask_app.conf
     ```
     Example configuration:
     ```ini
     [program:my_flask_app]
     command=gunicorn --bind 0.0.0.0:5000 app:app
     directory=/home/ubuntu/my_flask_app/repository
     autostart=true
     autorestart=true
     stderr_logfile=/var/log/my_flask_app.err.log
     stdout_logfile=/var/log/my_flask_app.out.log
     ```

4. **Test Your Deployment:**
   - **Open your browser or use a tool like `curl` to access your Flask app via the public IP or domain name of your EC2 instance to ensure it’s running correctly.**

o replace your EC2 instance's public IP address with a more user-friendly domain name, you'll need to follow these steps:

1. Purchase a Domain Name
First, you need to purchase a domain name from a domain registrar like:

GoDaddy
Namecheap
Google Domains
2. Set Up DNS Records
Once you have your domain name, you need to configure DNS records to point to your EC2 instance. Here’s how you can do it:

a. Get Your EC2 Public IP
Make sure you have the public IP address of your EC2 instance. You can find it on the AWS EC2 dashboard.

b. Update DNS Settings
Log In to Your Domain Registrar

Go to the domain registrar where you purchased your domain and log in to your account.

Find DNS Management or DNS Settings

Look for a section labeled "DNS Management," "DNS Settings," or similar. This is where you can add or modify DNS records.

Add an A Record

Type: A
Name: @ (This represents the root domain, or you can specify a subdomain like www if you want www.yourdomain.com)
Value: Your EC2 instance's public IP address
TTL: You can leave it at the default value or set it to 3600 seconds (1 hour).
(Optional) Add a CNAME Record

If you want to use www.yourdomain.com to point to your domain without the www prefix:

Type: CNAME
Name: www
Value: yourdomain.com (Replace yourdomain.com with your actual domain)
Save Changes

Save the DNS settings. DNS propagation can take some time (usually up to 48 hours, but often much quicker).

3. Configure Your EC2 Instance (Optional)
For better reliability, you might want to use an Elastic IP with your EC2 instance, which is a static IP address provided by AWS. This ensures that your IP address doesn’t change:

Allocate an Elastic IP

Go to the EC2 dashboard.
Click on Elastic IPs in the left-hand menu.
Click Allocate Elastic IP address.
Associate the Elastic IP

After allocation, select the Elastic IP address.
Click Actions and choose Associate Elastic IP address.
Select your EC2 instance and associate the IP address.
Replace the public IP in your DNS settings with the Elastic IP address to maintain a consistent IP even if your EC2 instance restarts.

4. Access Your Application
Once DNS propagation is complete, you should be able to access your application using your domain name:

arduino
Copy code
http://yourdomain.com:5000
or, if you configured www:

arduino
Copy code
http://www.yourdomain.com:5000
Additional Considerations
SSL/TLS: For security, you should use HTTPS. You can obtain an SSL certificate from Let’s Encrypt and configure your web server to use HTTPS.
Web Server Configuration: For a production setup, consider using a web server like Nginx or Apache as a reverse proxy to manage SSL/TLS and handle traffic more efficiently.
Feel free to ask if you need help with any specific step or additional configurations!







You said:
there isnt a way to get rid of the :500 in the http://www.yourdomain.com:5000 or to include it ?
ChatGPT said:
ChatGPT
Yes, you can get rid of the port number in your URL (:5000) by using a reverse proxy or web server configuration. This is a common practice to make URLs cleaner and more user-friendly. Here’s how you can do it:

Option 1: Use a Reverse Proxy with Nginx
Nginx can act as a reverse proxy that forwards requests from port 80 (HTTP) or 443 (HTTPS) to your Gunicorn server running on port 5000.

1. Install Nginx
If Nginx is not already installed, you can install it using the following commands:

bash
Copy code
sudo apt update
sudo apt install nginx
2. Configure Nginx
Create a new configuration file for your site in the /etc/nginx/sites-available/ directory. For example:

bash
Copy code
sudo nano /etc/nginx/sites-available/myapp
Add the following configuration to this file:

nginx
Copy code
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;  # Forward requests to your Gunicorn server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
Save and close the file.

3. Enable the Nginx Configuration
Create a symbolic link to the configuration file in the sites-enabled directory and then test and restart Nginx:

bash
Copy code
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
Now, Nginx will listen on port 80 and forward requests to your Gunicorn server running on port 5000. You can access your app using http://yourdomain.com without needing to specify the port.

Option 2: Use Apache as a Reverse Proxy
If you prefer Apache, you can set it up similarly.

1. Install Apache
bash
Copy code
sudo apt update
sudo apt install apache2
2. Enable Necessary Modules
Enable the proxy and proxy_http modules:

bash
Copy code
sudo a2enmod proxy
sudo a2enmod proxy_http
3. Configure Apache
Create a new virtual host configuration file:

bash
Copy code
sudo nano /etc/apache2/sites-available/myapp.conf
Add the following configuration:

apache
Copy code
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    ProxyRequests Off
    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/

    <Proxy *>
        Order allow,deny
        Allow from all
    </Proxy>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
Save and close the file.

4. Enable the Site and Restart Apache
bash
Copy code
sudo a2ensite myapp.conf
sudo systemctl restart apache2
With Apache configured, it will forward requests from port 80 to your Gunicorn server running on port 5000. Access your app using http://yourdomain.com without needing to specify the port.

Summary
By setting up Nginx or Apache as a reverse proxy, you can access your Flask application through your domain without having to include the port number in the URL. This setup also allows you to easily add HTTPS support and other features in the future.

Let me know if you have any questions or run into any issues!







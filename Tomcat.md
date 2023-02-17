# Tomcat 
is a web server and servlet container that is used to serve **Java web applications**. 
When you start Tomcat, it runs as a Java process and **listens** for incoming HTTP requests on a specified port (usually port 8080).\
When a request comes in, Tomcat **processes** the request and **sends** a response back to the client.
A Java web application typically consists of Java classes, HTML pages, CSS files, JavaScript files, and other resources. These files are **packaged into a single file called a WAR (Web ARchive) file**.\
The WAR file is essentially a **compressed** archive that contains all the necessary files and folders needed to run the web application.

## Deploy to Tomcat
When you deploy a WAR file to Tomcat, Tomcat **extracts** the contents of the WAR file into a directory on the server's file system. By default, this directory is located at `$CATALINA_HOME/webapps/<war-file-name>/`, where $CATALINA_HOME is the installation directory of Tomcat and <war-file-name> is the name of the WAR file (without the .war extension).

For example, if you deploy a web application called "myapp.war" to Tomcat, Tomcat will extract the contents of the WAR file to the directory $CATALINA_HOME/webapps/myapp/.

Tomcat then **creates a context** for the web application based on the contents of the WEB-INF/web.xml file. The context contains information about the web application, such as the URL mappings, servlets, filters, and other configuration information.

## In Action
When a client sends a request for a URL that maps to the web application, Tomcat uses the context to determine how to handle the request. It might call a servlet to generate a response, or it might serve up a static file such as an HTML page or an image file.

In summary, Tomcat is a web server and servlet container that is used to serve Java web applications. It extracts the contents of a WAR file into a directory on the server's file system, creates a context for the web application based on the contents of the WEB-INF/web.xml file, and uses the context to handle incoming HTTP requests.

# Tomcat 
is a web server and servlet container that is used to serve **Java web applications**. 
When you start Tomcat, it runs as a Java process and **listens** for incoming HTTP requests on a specified port (usually port 8080).\
When a request comes in, Tomcat **processes** the request and **sends** a response back to the client.
A Java web application typically consists of Java classes, HTML pages, CSS files, JavaScript files, and other resources. These files are **packaged into a single file called a WAR (Web ARchive) file**.\
The WAR file is essentially a **compressed** archive that contains all the necessary files and folders needed to run the web application.

## Deploy to Tomcat: Theroy
When you deploy a WAR file to Tomcat, Tomcat **extracts** the contents of the WAR file into a directory on the server's file system. By default, this directory is located at `$CATALINA_HOME/webapps/<war-file-name>/`, where $CATALINA_HOME is the installation directory of Tomcat and <war-file-name> is the name of the WAR file (without the .war extension).

For example, if you deploy a web application called "myapp.war" to Tomcat, Tomcat will extract the contents of the WAR file to the directory $CATALINA_HOME/webapps/myapp/.

Tomcat then **creates a context** for the web application based on the contents of the WEB-INF/web.xml file. The context contains information about the web application, such as the URL mappings, servlets, filters, and other configuration information.

## Deploy: Non Theory
To deploy a Java web application to Tomcat, you need to **copy the WAR file to the "webapps" directory** of your Tomcat installation. By default, the "webapps" directory is located at $CATALINA_HOME/webapps/, where $CATALINA_HOME is the installation directory of Tomcat.

When you copy the WAR file to the "webapps" directory, Tomcat will **automatically deploy** it by extracting its contents to a new directory under "webapps". The name of the new directory is usually the same as the name of the WAR file (without the .war extension).

### Example
if you have a WAR file called "myapp.war", you can deploy it to Tomcat by copying it to the "webapps" directory. After the deployment, Tomcat will extract the contents of the WAR file to a new directory called "myapp" under "webapps". You can then access your application by using the context path of "/myapp" in the URL.

### Customize
If you want to customize the deployment settings of your web application, you can create a context XML file and place it in the "conf/Catalina/localhost" directory of your Tomcat installation. The context XML file should have the same name as the directory where your web application is deployed (e.g., "myapp.xml" for a web application deployed to "webapps/myapp").

In the context XML file, you can define various settings for your web application, such as the context path, the database connection settings, and the security settings. Here is an example of a simple context XML file:

<pre>
```xml
<Context path="/myapp">
    <Resource name="jdbc/mydb" auth="Container" type="javax.sql.DataSource"
              username="myuser" password="mypassword"
              driverClassName="com.mysql.jdbc.Driver"
              url="jdbc:mysql://localhost/mydb"/>
</Context>
```
</pre>
  
In this example, the context path of the web application is set to "/myapp", and a database connection pool is defined with the JNDI name "jdbc/mydb". You can place your own context XML file in the "conf/Catalina/localhost" directory to customize the deployment settings of your web application.

  
## In Action
When a client sends a request for a URL that maps to the web application, Tomcat uses the context to determine how to handle the request. It might call a servlet to generate a response, or it might serve up a static file such as an HTML page or an image file.

## In summary
Tomcat is a web server and servlet container that is used to serve Java web applications. 
* It extracts the contents of a WAR file into a directory on the server's file system
* creates a context for the web application based on the contents of the WEB-INF/web.xml file
* uses the context to handle incoming HTTP requests.

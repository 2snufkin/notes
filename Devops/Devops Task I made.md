## Deploy using maven plugin:
development: Desktop PC/ windows
deploy: Amazon ec2 instance
I created a maven web app projext frol archytype. 
1. insatlled tomcat on ec2
2. open the 8080 port of the security group that attched to the ec2 instance
3. I added a tomcat7-maven-plugin with the url of the ec2 instance
4. modify th setting.xml inside .m2 to include the password and username that were define on tomcat that was installed on ec2
# Role
the developer give the devops a code and the devops need to copy it to the server. the developers has some rules\
+ the code will be given every day or couples of times a day
+ Compile and deploy it on test and prod servers
+ Prod servers are used by clients so the server should be running all the time

## Tools
I get the code via **source code management tool**. The code can't be understood by the server, it needs to be compiled with **compilation tool**. You want to test it so you need **Integration tool**.
If everything is fine you move to the deployment phase with the **deployment tools**. Then you need to monitor the application if it working properly **Monitoring tools**
 + 

## Tools Covered
### Development
+ Git: Version control system
+ Maven: Build tool
+ Jenkins: Continues Integration
+ SonarQube: Code Analyzer
### Deployment
+ Ansible: Deployment & Configuration management
+ Docker: Containerization
+ Kubernetes: container management
+ Prometheus: Monitoring & Alerting

## Lifecycle
Continuous.\
### Development: 
Devops don't write app code. they use the code through source code managment tools: **git**, bitbucket, gitLab, prtforce
### Integration 
tools: **Jenkins**, Bamboo, TeamCity, circleci
there are mulitplr things to do:
+ Unit testing: Junit,Nunit etc...
+ Code build: Maven, Ant, Gradle
+ Code Analysis: SonarQube, Veracode
+ Code artifact: Nexus, Jfrog Artifactory, DockerHub
### Deployment
tools: Ansible, Urban code, Jenkins, Travis CI, Octopus deploy
infrastructure: Docker, kbernetes, Azure, Amazon web services
Configuration management: Ansible, CHEF, puppet, SaltStack
### Testing
Selenium , JMeter, Tricentis
### Monitoring
Tools: Nagios, Zabbix, Promotheus
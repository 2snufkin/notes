# HTTP Basic Auth
A straightforward method for controlling access to web resources. 
**How:** 
1. write the string username:password
2. Go to Base64 Encoder website and encode the string
3. In the request add the Authorization header with the value: Basic encoded_string
Example: {Authorization: Basic Ym9iOnNlY3JldCE=}, Ym9iOnNlY3JldCE= is the encoded string (step 2)

## Why Yes
**Simplicity:**straightforward implementation and usage, demanding minimal effort from developers.
**Wide Support:** Enjoying extensive support across major web browsers and servers.
**Stateless:** This authentication method operates in a stateless manner, ensuring each request functions independently without reliance on previous interactions. 
**Easy to Implement:** uncomplicated, requiring only the addition of a few headers to the HTTP response for successful integration.

## Why No
**Security Concerns:** security challenges by transmitting credentials in a Base64 format susceptible to decoding. Although using HTTPS enhances security, concerns persist.
**No Session Management:** Lacking session management features, HTTP Basic Authentication does not include a logout mechanism, necessitating user intervention to terminate access.
**Limited Extensibility:** This authentication method has limited support for advanced features such as multi-factor authentication or token-based systems, restricting its application in more complex security scenarios.
**Vulnerability to Credential Sniffing:** The transmission of credentials with each request poses a risk to packet sniffing attacks. While HTTPS mitigates this risk, it remains a potential concern.

# Spring Security
Login: Behind the scene when you login Spring Security estabilsh a session with the server (Tomcat) and there is a cookie with the java session id. You can navigate in the app without relogin everytime thanks to this session (cookie)

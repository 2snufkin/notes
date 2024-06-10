# New App
1. Create virtual enviroment and activate it 
2. install flask
3. create the following directories: 1.template: for your html files 2. static: for css, fonts etc...
4. create an app object and named it app
5. if name is main run the app
5. create all the routes and thier functions (empty functions: and pass for the body of the route)
6. write the htmls  files with no css
7. create the database.py file to connect to the database
8. to avoid memeory links create a close_db function and anotate it with @app.teardown_appcontext
9. create the db
10. if your html contains form tesy it by returning '<p> form att </p>'

## User Register
user the generate_password_hash(password, method="")

## User Login
get the user with the username (if exists)
use the check_password_hash(in_the_db, user_input)

### Session
1. import session
2. define app.config['SECRET_KEY']
3. when the user log in keep it in the session with the key 'user'
4. to do things condintally you can check `if 'user' in session` 
5. to render the navbar according to if the user is login or not you can pass the user from the seesion to the layout

## Logout
pop the user from the
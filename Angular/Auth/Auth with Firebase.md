# Auth
validation can't take place on the browser since the user can change the JS code or disable it
Session: if the server render the HTML files we will work with a session. Angular works with Restful API, there are no session, the server can't save the session of the client since it does not know about it, it does not care about it
Server: the server will validate that the user is who he says he is (username and passwords match) and then send a token
JWT: the token. String that contains metadata. Encoded but not encrypted
Encoding: the process of converting data from one representation to another, often to facilitate data transmission or storage. 
Generation: On the server with a certain algo/secret that only the server knows
Client: will store the token (localstorage for example) and will atatch it to each request
Validation: the server can validate the token since it was the one that created it
Cheat: we can't generate a fake token since it won't fit the algo and the validation on the server and the server will block access

## Implementing Auth
1. Create the auth component (html + css + ts)
2. If you have SignUp, create also a component for that
3. Prepare the Backend (Console)
4. Implement Sign Up/ SignIn method: You will use the Firebase Auth REST API so google it to reach the up-to-date docs (the link here can be changed in the future)
A. Sign Up: create a signup method in the auth service




## Prepare the backend
1. Go to the console and to the firestore database
2. go to role and change the rule to `allow read, write: if request.auth != null;`
3. Go to Authentification => Sign-in method
4. Choose you desired method.
5. Users are not save in a users tables but in the Authentification page under Users


## Sign Up with email / password
You can create a new email and password user by issuing an HTTP POST request to the Auth signupNewUser endpoint.

Method: POST
Content-Type: application/json
Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
In the example above, you would replace [API_KEY] with the Web API Key of your Firebase project.

### Request Body Payload
| Property Name     | Type    | Description                                                |
|-------------------|---------|------------------------------------------------------------|
| email             | string  | The email for the user to create.                          |
| password          | string  | The password for the user to create.                       |
| returnSecureToken | boolean | Whether or not to return an ID and refresh token. Should always be true. |

### Response Payload
| Property Name | Type   | Description                                             |
|---------------|--------|---------------------------------------------------------|
| idToken       | string | A Firebase Auth ID token for the newly created user.    |
| email         | string | The email for the newly created user.                   |
| refreshToken  | string | A Firebase Auth refresh token for the newly created user. |
| expiresIn     | string | The number of seconds in which the ID token expires.    |
| localId       | string | The uid of the newly created user.                      |

### Auth Service
create the signup method
```ts

signupURL= "..."
signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        signupURL,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

```

it's good practice to create the response interface
```
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

```

Common error codes

    EMAIL_EXISTS: The email address is already in use by another account.
    OPERATION_NOT_ALLOWED: Password sign-in is disabled for this project.
    TOO_MANY_ATTEMPTS_TRY_LATER: We have blocked all requests from this device due to unusual activity. Try again later.

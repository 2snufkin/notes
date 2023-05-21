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
5. Handle errors in the UI
6. Create a user class
7. in the auth service create a Subject that will emit the user `user = new BehaviorSubject<User>(null);`
8. in the login/signin methods inside the auth service fire a new user 
9. when the user is logged in navigate to another compoent(you don't want to be stuck in the login component)
10. Change the UI dynalmically to wheather the user is logged in 
11. Attach the token to each request: DRY and use Interceptor
12. Add Logout
13. Add Auto Login
14. Add Auto Logout
15. Add Guard

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
      // Error management
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


### Component
1. Inject the auth Service
2. subscribe the signup method


## Sign In with email / password
it's the same as Sign Up but you just send a request to a diffrent URL

## User class
in the token getter i don't want just to return it, i want to check first that it is valid (not expired)
```ts
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

```

## User subject
```ts
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }


```


## Fire user
```ts

login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwB_3o7Y',
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

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}



```

## Navigate
1. Inject the Router
`  constructor(private authService: AuthService, private router:Router) {`
2. Only if the login in is succeded navigate
`      this.router.navigate(['/.....'])`

## Login UI
if the user not looged in he should not see the logout button and if he looged in it should see the logout button. There are other caases where you want to change the UI acordinly
for doing so you need to a source of truth, wheather the user is valid/login and this is the user Subject
Every component that want to know if the user is loged in should subscribe to the subject

## Attach token
The firebase implementaion says that you had the token not in the bodt but  as a query parameter.
### Getting the token
you will think to subscribe to the user Subject, get the token and attach it to the http request but you don't want an ongoing subscription you just want the token.
Ongoing subscription is used to upadte the UI reactively
there are several ways to implement it:
1. whenever you emit a new value, assign a token to a token variable
2. Use BehavioralSubject: it gives you an access to the previous value ieven if you were not subscribed in the moment it was emitted
3. in the component you want to take the latested emiited value and then unsubscribe , you don't need it anymore. instraed of subscribe and uns=ubscribed you can use the take() operator
take(): It subscribes to the source observable and starts emitting values until it reaches the specified count, at which point it completes and unsubscribes automatically.

### Adding interceptor
1. Create an Interceptor class that implements HttpInterceptor and has an intercept method
The intercept method: a required method when implementing the HttpInterceptor interface from @angular/common/http. It intercepts HTTP requests and optionally modifies them before passing them along to the next interceptor or the final HTTP handler.
An interceptor should return `next.handle(req)` and before return it you trat it as you want
```ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  // the HttpRequest is of type any since you don't know how it will look like
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        // if the user is null, just send the request (the user is null when he tries to login)
        if (!user) {
          return next.handle(req);
        }
        // if there is a user, clone the request, and add the auth paramaeter
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}

```
2. in the app.moudle inside the providers add this object
```
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }

```
and add `import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
`

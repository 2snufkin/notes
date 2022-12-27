# Router Guards

1. create a  ts class (auth.guards fro ex )
```
export class AuthGuard implements CanActivate{
}
```
2. You need to implements the canActivate method.
This methods can have as arguments
route: ActivatedRouteSnapshot: represent the route I am trying to activate
state: RouterStateSnapshot: the current routing state
both of them are imported from '@angular/route'
```
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
}
```
This method will be executed by Angular every time I want to activated the route. This method need to return true or a promise that resolve to true or an observable that resolve to true

3. Inject the AuthService and call the method isAuth that you created that will return true if the user is auth and false if not
```
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	this.authService.isAuth()
}
```
4. If the user is not auth he will be stuck. You want to redirect it to a certain path for example login
```
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	if(this.authService.isAuth()){
	return true;
} else{
this.router.navigate(['/login'])
}
```
5. Now use it in the app.routing. Go to the path you want to protect,
```
{path: 'training', component: TrainingComponent, canActivate: [AuthGuard] 
```
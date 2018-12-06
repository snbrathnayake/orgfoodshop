import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthModel } from '../models/Auth-Model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    const {auth , router } = this;
    return auth.currentUserObservable.map(user => {
      if (user) {
        return true;
      }
      router.navigate(['/login'] , { queryParams: {returnURL: state.url }});
      return false;
    });
  }

}

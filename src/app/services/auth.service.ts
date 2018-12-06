import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthModel } from '../models/Auth-Model';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  private authResponse: AuthModel = null;

  constructor(private afAuth: AngularFireAuth,
    private userService: UserService,
    private db: AngularFireDatabase,
    private router: Router) {

    afAuth.authState.subscribe(auth => {
      console.log(auth);
      this.authResponse = auth;
    });
  }

  get authenticated(): boolean {
    return this.authResponse !== null;
  }

  // Returns current user data
  get currentUser(): AuthModel {
    return this.authenticated ? this.authResponse : null;
  }
  // Returns Observable AuthModel=> firbase.user
  get currentUserObservable(): Observable<AuthModel> {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authResponse.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authResponse.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authResponse) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authResponse.displayName || 'User without a Name';
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }
  private socialSignIn(provider): any {
    return this.afAuth.auth.signInWithRedirect(provider)
      .then((credential) => {
        this.authResponse = credential.user;
      })
      .then(() => {
        this.userService.updateUserData(this.currentUserId , this.currentUser);
      })
      .catch(error => console.log(error));
  }
}

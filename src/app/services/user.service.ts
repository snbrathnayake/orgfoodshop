import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { AuthModel } from '../models/Auth-Model';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  updateUserData(id: string, authObject: AuthModel) {
    const path = `users/${id}`; // Endpoint on firebase
    const data = {
      email: authObject.email,
      name: authObject.displayName
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }

  getUserData(id: string): FirebaseObjectObservable <UserModel> {
    const path = `users/${id}`;

    return this.db.object(path);
  }
}

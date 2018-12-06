import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  routeCompleted = true;
  href: string;

  constructor(private auth: AuthService, private router: Router) {
    auth.currentUserObservable.subscribe(user => {
      if (user) {
        const backToURL = localStorage.getItem('returnURL');
        router.navigateByUrl(backToURL);
      }
    });
  }

  get ready() {
    return this.routeCompleted;
  }
}

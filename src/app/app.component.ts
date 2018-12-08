import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { skipUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routeCompleted = null;

  constructor(
    private auth: AuthService,
    private router: Router) {
    // TODO move to application.service
    // this.auth.currentUserObservable.subscribe(user => {
    //   if (!user) { return; } else {  }
    // });
    this.route();
  }

  get ready(): boolean {
    return this.routeCompleted;
  }

  private route() {
    const href = localStorage.getItem('returnURL');
    if (href && href.length > 1) {
      this.routeCompleted = false;
      localStorage.removeItem('returnURL');
      this.router.navigateByUrl(href).then((completed) => {
        this.routeCompleted = completed;
      });
    } else {
      this.routeCompleted = true;
    }
  }

  private initAuth() { }
}

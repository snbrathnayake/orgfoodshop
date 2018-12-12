import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }

  get routeLinkClass(): string {
    const { auth } = this;
    let result = 'dropdown-item';
    if (!auth.isAdmin) {
      return result += ' disabled';
    }
    return result;
  }

  get usernameSpliter() {
    const { auth } = this;
    return auth.currentUsername.split(' ' , 1);
  }
}

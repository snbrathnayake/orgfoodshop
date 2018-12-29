import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;
  shoppingCartItemCount: number;
  cartBucket$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    // listen to the cart-item(#count) onChanged
    // get cart-bucket changes (single cart for page)
    this.cartBucket$ = await this.shoppingCartService.getCart();
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

}

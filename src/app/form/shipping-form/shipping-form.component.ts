import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order-model';
import { AuthService } from '../../services/auth.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string = null;

  constructor(
     private router: Router,
     private auth: AuthService,
     private orderService: OrderService) { }

  ngOnInit() {
    this.userId = this.auth.currentUserId;
  }

  async placeOrder() {
    const { router , userId , shipping , cart} = this;
    let order = new Order(userId, shipping, cart);
    let result  = await this.orderService.placeOrder(order);
    /**
     * key  use => something stored in firebase
     * $key use => read from firebase
     */
    router.navigate(['/order-success' , result.key]);
  }
}

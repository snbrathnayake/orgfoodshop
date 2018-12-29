import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$: any;
  userId: string;

  constructor(private orderService: OrderService , private auth: AuthService) {
    this.userId = auth.currentUserId;
  }

  ngOnInit() {
    this.orders$ = this.orderService.getOrderByUser(this.userId);
  }

}

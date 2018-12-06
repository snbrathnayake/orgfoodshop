import { LoginComponent } from './login/login.component';
import { routePaths } from './route-paths';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './management/products/products.component';
import { ShoppingCartComponent } from './management/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './management/check-out/check-out.component';
import { OrderSuccessComponent } from './management/order-success/order-success.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { Routes } from '@angular/router';
import { MyOrdersComponent } from './management/my-orders/my-orders.component';

export const routes: Routes = [
    {
      path: routePaths.home,
      component: HomeComponent,
    },
    {
      path: routePaths.login,
      component: LoginComponent,
    },
    {
      path: routePaths.myOrders,
      component: MyOrdersComponent,
    },
    {
      path: routePaths.products,
      component: ProductsComponent,
    },
    {
      path: routePaths.shoppingCart,
      component: ShoppingCartComponent,
    },
    {
      path: routePaths.checkOut,
      component: CheckOutComponent,
    },
    {
      path: routePaths.successOrders,
      component: OrderSuccessComponent,
    },
    {
      path: routePaths.adminOrders,
      component: AdminOrdersComponent,
    },
    {
      path: routePaths.adminProducts,
      component: AdminProductsComponent,
    },
];

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
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './form/admin/product-form/product-form.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

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
    path: routePaths.products,
    component: ProductsComponent,
  },
  {
    path: routePaths.shoppingCart,
    component: ShoppingCartComponent,
  },
  {
    path: routePaths.myOrders,
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routePaths.checkOut,
    component: CheckOutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routePaths.successOrders,
    component: OrderSuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routePaths.adminOrders,
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: routePaths.adminProductForm,
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: routePaths.adminProductById,
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: routePaths.adminProducts,
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: routePaths.notFound,
    component: PageNotFoundComponent,
  }
];

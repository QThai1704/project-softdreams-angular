import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthComponent} from "./auth/auth.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ContextComponent} from "./context/context.component";
import {CartComponent} from "./cart/cart.component";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {ProductComponent} from "./components/admin/product/product.component";
import {UserComponent} from "./components/admin/user/user.component";
import {OrderComponent} from "./components/admin/order/order.component";
import {ReportComponent} from "./components/admin/report/report.component";
import {CreateUserComponent} from "./components/admin/user/create-user/create-user.component";
import {ShowUserComponent} from "./components/admin/user/show-user/show-user.component";
import {ViewUserComponent} from "./components/admin/user/view-user/view-user.component";
import {UpdateUserComponent} from "./components/admin/user/update-user/update-user.component";
import {DeleteUserComponent} from "./components/admin/user/delete-user/delete-user.component";
import {ShowProductComponent} from "./components/admin/product/show-product/show-product.component";
import {CreateProductComponent} from "./components/admin/product/create-product/create-product.component";
import {ViewProductComponent} from "./components/admin/product/view-product/view-product.component";
import {UpdateProductComponent} from "./components/admin/product/update-product/update-product.component";
import {DeleteProductComponent} from "./components/admin/product/delete-product/delete-product.component";
import {ShowOrderComponent} from "./components/admin/order/show-order/show-order.component";
import {ViewOrderComponent} from "./components/admin/order/view-order/view-order.component";
import {UpdateOrderComponent} from "./components/admin/order/update-order/update-order.component";
import {DeleteOrderComponent} from "./components/admin/order/delete-order/delete-order.component";
import {CheckOutComponent} from "./cart/check-out/check-out.component";
import {ThanksComponent} from "./cart/thanks/thanks.component";

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ContextComponent, title: 'Home page',
    children: [
      { path: 'products', component: ProductDetailComponent, title: 'View Product' },
      { path: '', component: HomeComponent, title: 'Home page'},
      { path: 'cart', component: CartComponent, title: 'Cart'},
      { path: 'checkout', component: CheckOutComponent, title: 'Kiểm tra đơn hàng' },
      { path: 'thanks', component: ThanksComponent, title: 'Thanh toán thành công'}
    ]
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'login/register', component: RegisterComponent, title: 'Register' },
  { path: 'admin', component: DashboardComponent, title: 'Admin Page',
    children: [
      { path: '', redirectTo: 'report', pathMatch: 'full' },
      { path: 'user', component:UserComponent, title: 'Manage User',
        children: [
            { path: '', redirectTo: 'show', pathMatch: 'full' },
            { path: 'show', component:ShowUserComponent, title: 'Show User' },
            { path: 'create', component:CreateUserComponent, title: 'Create User' },
            { path: 'view/:id', component:ViewUserComponent, title: 'View User' },
            { path: 'update/:id', component:UpdateUserComponent, title: 'Update User' },
          { path: 'delete/:id', component:DeleteUserComponent, title: 'Delete User' },
        ]},
      { path: 'product', component:ProductComponent, title: 'Manage Project',
        children: [
          { path: '', redirectTo: 'show', pathMatch: 'full' },
          { path: 'show', component:ShowProductComponent, title: 'Show Product' },
          { path: 'create', component:CreateProductComponent, title: 'Create Product' },
          { path: 'view/:id', component:ViewProductComponent, title: 'View Product' },
          { path: 'update/:id', component:UpdateProductComponent, title: 'Update Product' },
          { path: 'delete/:id', component:DeleteProductComponent, title: 'Delete Product' },
        ]},
      { path: 'order', component:OrderComponent, title: 'Manage Order',
        children: [
          { path: '', redirectTo: 'show', pathMatch: 'full' },
          { path: 'show', component:ShowOrderComponent, title: 'Show Order' },
          { path: 'view/:id', component:ViewOrderComponent, title: 'View Order' },
          { path: 'update/:id', component:UpdateOrderComponent, title: 'Update Order' },
          { path: 'delete/:id', component:DeleteOrderComponent, title: 'Delete Order' },
        ]},
      { path: 'report', component:ReportComponent, title: 'Manage Report' },
    ]
  }
];

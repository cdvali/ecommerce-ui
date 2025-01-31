import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrderViewComponent } from './pages/order-view/order-view.component';
import { OrderListComponent } from './pages/order-list/order-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'orders', pathMatch: 'full' },
            { path: 'orders', component: OrderListComponent },
            { path: 'orders/new', component: OrderCreateComponent },
            { path: 'orders/:id', component: OrderViewComponent },
            { path: 'products', component: ProductListComponent },
            { path: 'products/new', component: ProductFormComponent },
            { path: 'products/edit/:id', component: ProductFormComponent },
        ]
    }
  ];
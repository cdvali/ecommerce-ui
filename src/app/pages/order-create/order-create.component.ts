import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { OrderService, Order } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: { productId: number; productName: string, quantity: number }[] = [];
  selectedProductId?: number;
  selectedQuantity: number = 1;

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  addProduct(): void {
    if (this.selectedProductId && this.selectedQuantity > 0) {
      const product = this.products.find(p => p.id === Number(this.selectedProductId));
      if (product) {
        this.selectedProducts.push({
          productId: product.id!,
          productName: product.name,
          quantity: this.selectedQuantity
        });
        this.selectedQuantity = 1;
      }
    }
  }

  removeProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.filter(item => item.productId !== productId);
  }

  placeOrder(): void {
    const order: Order = { orderProducts: this.selectedProducts };
    
    this.orderService.createOrder(order).subscribe((createdOrder: Order) => {
      this.snackBar.open('Order placed successfully!', 'Close', { 
        duration: 3000,
        panelClass: ['snackbar-success']
      });

      setTimeout(() => {
        this.router.navigate(['/orders', createdOrder.id]);
      }, 1000);
    });
  }
}

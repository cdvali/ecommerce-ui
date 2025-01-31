import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../services/order.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'status', 'totalOrderPrice', 'numberOfProducts', 'actions'];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => this.orders = data);
  }

  newOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  viewOrder(orderId: number): void {
    this.router.navigate(['/orders', orderId]);
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(() => {
        // After deletion, reload the orders list
        this.orders = this.orders.filter(order => order.id !== orderId);
        alert('Order deleted successfully!');
      });
    }
  }
}

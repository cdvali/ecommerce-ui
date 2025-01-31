import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0 };
  isEditMode = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProduct(+id).subscribe(data => this.product = data);
    }
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id!, this.product).subscribe(() => this.router.navigate(['/products']));
    } else {
      this.productService.createProduct(this.product).subscribe(() => this.router.navigate(['/products']));
    }
  }
}

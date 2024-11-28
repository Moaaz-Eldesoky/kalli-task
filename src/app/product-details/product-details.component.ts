import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  @Input() products: any[] = [];
  currentProductIndex: number = 0;
  currentProduct: any;

  ngOnInit(): void {
    this.updateProduct(); // Initialize with the first product
  }

  updateProduct(): void {
    // Set the current product based on the current index
    this.currentProduct = this.products[this.currentProductIndex];
  }

  // Move to the next product
  nextProduct(): void {
    if (this.currentProductIndex < this.products.length - 1) {
      this.currentProductIndex++;
      this.updateProduct();
    }
  }

  // Move to the previous product
  previousProduct(): void {
    if (this.currentProductIndex > 0) {
      this.currentProductIndex--;
      this.updateProduct();
    }
  }
}

import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'], // Fixed `styleUrl` to `styleUrls`
})
export class ProductDetailsComponent {
  @Input() products: Product[] = [];
  currentProductIndex: number = 0;
  currentProduct!: Product;

  ngOnInit(): void {
    this.updateProduct();
  }

  // Updates the current product details based on the current index
  updateProduct(): void {
    this.currentProduct = this.products[this.currentProductIndex];
  }

  // Navigates to the next product
  nextProduct(): void {
    if (this.currentProductIndex < this.products.length - 1) {
      this.currentProductIndex++;
    } else {
      this.currentProductIndex = 0; // Loop back to the first product
    }
    this.updateProduct();
  }

  // Navigates to the previous product
  previousProduct(): void {
    if (this.currentProductIndex > 0) {
      this.currentProductIndex--;
    } else {
      this.currentProductIndex = this.products.length - 1; // Loop back to the last product
    }
    this.updateProduct();
  }

  // Navigates to a specific product when a dot is clicked
  goToProduct(index: number, event?: Event): void {
    if (event) {
      event.preventDefault(); // Prevent Bootstrap default behavior
    }
    this.currentProductIndex = index;
    this.updateProduct();
  }
}

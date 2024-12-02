import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

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
  selectedSize!: number; // Track the selected size
  selectedColor!: string; // Track the selected color
  selectedImages: string[] = []; // Images of the selected color
  FavList: any = [];
  count: any;
  isFav: boolean = false; // Track if the product is in favorites

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateProduct();
  }

  // Updates the current product and selected color
  updateProduct(): void {
    this.currentProduct = this.products[this.currentProductIndex];
    this.selectedSize = this.currentProduct.size[0]; // Default size
    this.selectColor(this.currentProduct.colors[0].hex); // Default color
  }

  // Navigate to the next product
  nextProduct(): void {
    this.currentProductIndex =
      (this.currentProductIndex + 1) % this.products.length;
    this.updateProduct();
  }

  // Navigate to the previous product
  previousProduct(): void {
    this.currentProductIndex =
      (this.currentProductIndex - 1 + this.products.length) %
      this.products.length;
    this.updateProduct();
  }

  // Navigate to a specific product
  goToProduct(index: number, event?: Event): void {
    event?.preventDefault(); // Prevent default behavior
    this.currentProductIndex = index;
    this.updateProduct();
  }

  // Select a size
  selectSize(size: number): void {
    this.selectedSize = size;
  }

  // Select a color and update images
  selectColor(colorHex: string): void {
    this.selectedColor = colorHex;
    const colorObject = this.currentProduct.colors.find(
      (color) => color.hex === colorHex
    );
    this.selectedImages = colorObject?.images || [];
  }

  // Calculate filled stars
  get filledStars(): number {
    return Math.floor(this.currentProduct.rate);
  }

  // Check for half star
  get hasHalfStar(): boolean {
    return this.currentProduct.rate % 1 !== 0;
  }

  // Get an array for stars
  getStarsArray(): number[] {
    return Array(5).fill(0);
  }
  CheckIsfav(): boolean {
    if (this.count in this.FavList) {
      return true;
    }
    return false;
  }

  addToCart() {
    console.log(this.currentProduct);
    this.cartService.addToCart(this.currentProduct);
    alert(`${this.currentProduct.title} has been added to your cart!`);
  }
  // Check if the product is in favorites
  isFavorite(): boolean {
    return this.isFav;
  }

  // Toggle the favorite status of the product
  toggleFavorite(): void {
    this.isFav = !this.isFav; // Toggle the favorite status
  }
}

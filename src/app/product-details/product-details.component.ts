import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  @Input() products: Product[] = [];
  currentProductIndex: number = 0;
  currentProduct!: Product;
  selectedSize!: number;
  selectedColor!: string;
  selectedImages: string[] = []; // Images of the selected color
  selectedThumbnail!: string;
  isFav: boolean = false; // Track if the product is in favorites
  mainImage!: string; // Track the selected main image
  animateImage: boolean = false;
  sizeList: number[] = [37, 38, 39, 40, 41];
  safeVideoUrl!: SafeResourceUrl;

  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.updateProduct();
    this.loadFavorites();
    this.updateVideoUrl();
  }

  // Updates the current product and selected color
  updateProduct(): void {
    this.currentProduct = this.products[this.currentProductIndex];
    this.selectedSize = this.currentProduct.size[0]; // Default size
    this.selectColor(this.currentProduct.colors[0].hex); // Default color
    this.updateVideoUrl();
    this.loadFavorites();
  }

  triggerAnimation(): void {
    this.animateImage = true;
    setTimeout(() => {
      this.animateImage = false;
    }, 1000); // Match the duration of the animation
  }

  // Navigate to the next product
  nextProduct(): void {
    this.currentProductIndex =
      (this.currentProductIndex + 1) % this.products.length;
    this.updateProduct();
    this.triggerAnimation();
  }

  // Navigate to the previous product
  previousProduct(): void {
    this.currentProductIndex =
      (this.currentProductIndex - 1 + this.products.length) %
      this.products.length;
    this.updateProduct();
    this.triggerAnimation();
  }

  // Navigate to a specific product
  goToProduct(index: number, event?: Event): void {
    event?.preventDefault(); // Prevent default behavior
    this.currentProductIndex = index;
    this.updateProduct();
    this.triggerAnimation();
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
    this.mainImage = this.selectedImages[0]; // Set the main image to the first image of the selected color
    this.triggerAnimation();
  }

  // Change the main image when a thumbnail is clicked
  changeMainImage(image: string): void {
    this.mainImage = image; // Update the main image with the clicked thumbnail image
    this.selectedThumbnail = image;
    this.triggerAnimation();
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
  updateVideoUrl(): void {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.currentProduct.video
    );
  }

  addToCart() {
    this.cartService.addToCart(this.currentProduct);
    this.toastr.success(
      `${this.currentProduct.title} has been added to your cart!`
    );
  }

  // Load the favorite status of the current product
  loadFavorites(): void {
    this.isFav = this.favoritesService.isFavorite(this.currentProduct);
  }

  // Check if the product is in favorites
  isFavorite(product: Product): boolean {
    return this.isFav;
  }

  // Toggle the favorite status of the product
  toggleFavorite(product: Product): void {
    this.favoritesService.toggleFavorite(this.currentProduct);
    this.loadFavorites(); // Refresh the local status to reflect changes
  }
}

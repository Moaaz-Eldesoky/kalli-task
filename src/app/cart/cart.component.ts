import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  items: any[] = [];
  total: number = 0;
  allProducts: Product[] = [];
  cartProducts: any[] = [];

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.loadAllProducts();
    this.getTotalPrice();
  }

  loadAllProducts() {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.allProducts = data;
      this.addProductDetailsToCartItems();
    });
  }
  addProductDetailsToCartItems() {
    // Match cart items with products and add product details to the cart items
    this.cartProducts = this.items.map((item) => {
      const product = this.allProducts.find((p) => p.id == item.id);
      console.log('product founded>>>' + product);
      return product ? { ...item, productDetails: product } : item;
    });
    this.getTotalPrice();
  }

  getProductImage(colors: any[], selectedColor: string): string {
    const basePath = 'assets/'; // Base path for images
    // Find the selected color object
    const selectedColorObj = colors.find((color) => color.hex == selectedColor);
    if (selectedColorObj) {
      const imagePath = selectedColorObj.images[0];
      return imagePath ? basePath + imagePath : 'assets/default-image.png'; // Default image if no specific image exists
    }

    return 'assets/default-image.png'; // Return default image if no color matches
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    this.cartProducts = [];
    this.getTotalPrice();
    this.toastr.success('Cart has been cleared!');
  }

  removeItem(item: any): void {
    // Use the service to remove the item by its ID
    this.cartService.removeFromCart(item.id);

    // Refresh cartProducts after the item is removed
    this.cartProducts = this.cartService.getItems().map((cartItem) => {
      const product = this.allProducts.find((p) => p.id == cartItem.id);
      return product ? { ...cartItem, productDetails: product } : cartItem;
    });

    // Update the total price
    this.getTotalPrice();

    // Notify the user
    this.toastr.info('Item removed from the cart!');
  }

  getTotalPrice(): void {
    this.total = this.cartProducts.reduce(
      (acc, item) =>
        acc + parseFloat(item.productDetails.price) * item.quantity,
      0
    );
  }
  pay() {
    console.log('allllllllll>>' + JSON.stringify(this.allProducts));
  }
}

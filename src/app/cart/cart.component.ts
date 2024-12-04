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
  clearCart() {
    this.items = this.cartService.clearCart();
    this.cartProducts = [];
    this.getTotalPrice();
    this.toastr.success('Cart has been cleared!');
  }

  removeItem(item: any): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.cartProducts.reduce(
      (acc, item) =>
        acc + parseFloat(item.productDetails.price) * item.quantity, // Multiply price by quantity
      0
    );
    console.log('Total price with quantity:', this.total); // For debugging purposes
  }
  pay() {
    console.log('allllllllll>>' + JSON.stringify(this.allProducts));
  }
}

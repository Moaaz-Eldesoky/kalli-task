import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localStorageKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Initialize with empty array
  cartItems$ = this.cartItemsSubject.asObservable(); // Observable to subscribe to

  constructor() {
    this.loadCart();
  }

  private items: any[] = [];

  addToCart(product: any) {
    this.items.push(product); // Add product to cart
    this.saveCart(); // Save cart to local storage
    this.cartItemsSubject.next(this.items); // Emit updated cart
  }

  getItems() {
    return this.items; // Get current cart items
  }

  clearCart() {
    this.items = []; // Clear the cart items
    this.saveCart(); // Save empty cart to local storage
    this.cartItemsSubject.next(this.items); // Emit empty cart
    return this.items;
  }

  private saveCart() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.items)); // Save to local storage
  }

  private loadCart() {
    const storedItems = localStorage.getItem(this.localStorageKey); // Get cart from local storage
    if (storedItems) {
      this.items = JSON.parse(storedItems); // Parse and load the cart items
      this.cartItemsSubject.next(this.items); // Emit cart items after loading
    }
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.length; // Return the number of items in the cart
  }
}

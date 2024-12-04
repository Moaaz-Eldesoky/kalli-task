import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartItems } from '../interfaces/cart-items.interface';

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

  private cartItems: cartItems[] = [];

  addToCart(item: cartItems) {
    const existingItem = this.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      // Otherwise, add the new item to the cart
      this.cartItems.push({
        ...item,
        quantity: 1,
      });
    }
    this.saveCart(); // Save cart to local storage
    this.cartItemsSubject.next(this.cartItems); // Emit updated cart
  }

  getItems() {
    return this.cartItems; // Get current cart items
  }

  clearCart() {
    this.cartItems = []; // Clear the cart items
    this.saveCart(); // Save empty cart to local storage
    this.cartItemsSubject.next(this.cartItems); // Emit empty cart
    return this.cartItems;
  }
  removeFromCart(itemId: number): void {
    // Filter out the item by ID
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.saveCart(); // Save the updated cart to local storage
    this.cartItemsSubject.next(this.cartItems); // Emit updated cart
  }

  private saveCart() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems)); // Save to local storage
  }

  private loadCart() {
    const storedItems = localStorage.getItem(this.localStorageKey); // Get cart from local storage
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems); // Parse and load the cart items
      this.cartItemsSubject.next(this.cartItems); // Emit cart items after loading
    }
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.length; // Return the number of items in the cart
  }
}

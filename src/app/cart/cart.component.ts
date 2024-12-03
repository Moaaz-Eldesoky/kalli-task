import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  items: any[] = [];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    this.toastr.success('Cart has been cleared!');
  }

  removeItem(item: any): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}

import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favorites'; // Key for localStorage

  constructor() {}

  // Get the current list of favorites from localStorage
  getFavorites(): Product[] {
    return JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
  }

  // Save the updated favorites list to localStorage
  saveFavorites(favorites: Product[]): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  // Check if a product is in the favorites list
  isFavorite(product: Product): boolean {
    const favorites = this.getFavorites();
    return favorites.some((fav) => fav.id === product.id);
  }

  // Toggle the favorite status of a product
  toggleFavorite(product: Product): void {
    const favorites = this.getFavorites();
    const isFav = this.isFavorite(product);

    if (isFav) {
      // Remove the product from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
      this.saveFavorites(updatedFavorites);
    } else {
      // Add the product to favorites
      favorites.push(product);
      this.saveFavorites(favorites);
    }
  }
}

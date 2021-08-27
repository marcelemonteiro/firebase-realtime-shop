import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartListRef: AngularFireList<any>;
  cartRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Add to cart
  addToCart(idProduto: string) {
    this.cartListRef = this.db.list('/cart');
    return this.cartListRef.push({
      idProduto
    });
  }

  // Get List
  getCartList() {
    this.cartListRef = this.db.list('/cart');
    return this.cartListRef;
  }

  // Remove Item from Card
  removeItem(id: string) {
    this.cartRef = this.db.object('/cart/' + id);
    this.cartRef.remove();
  }

  // Delete All Cart
  deleteAllCart() {
    this.cartListRef.remove();
  }
}

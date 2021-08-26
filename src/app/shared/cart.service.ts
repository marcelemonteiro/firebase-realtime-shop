import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartListRef: AngularFireList<any>;
  cartRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Add to cart
  addToCart(idProduto: string, quantidade: number) {
    this.cartListRef = this.db.list('/cart');

    return this.cartListRef.push({
      idProduto,
      quantidade
    });
  }

  // Get List
  getCartList() {
    this.cartListRef = this.db.list('cart');
    return this.cartListRef;
  }

  removeItem(id: string) {
    this.cartRef = this.db.object('/cart/' + id);
    this.cartListRef.remove();
  }

  // Delete All Cart
  deleteAllCart() {
    this.cartListRef.remove();
  }
}

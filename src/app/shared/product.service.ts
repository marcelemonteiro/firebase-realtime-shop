import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productListRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createProduct(p: Product) {
    this.productListRef = this.db.list('/product');

    return this.productListRef.push({
      name: p.name,
      price: p.price,
      category: p.category
    });
  }

  // Get Single
  getProduct(id: any) {
    this.productRef = this.db.object('/product/' + id);
    return this.productRef;
  }

  // Get List
  getProductList() {
    this.productListRef = this.db.list('/product');
    return this.productListRef;
  }

  // Update
  updateProduct(id: string, p: Product) {
    return this.productListRef.update(id, {
      name: p.name,
      price: p.price,
      category: p.category
    });
  }

  // Delete
  deleteProduct(id: string) {
    this.productRef = this.db.object('/product/' + id);
    this.productRef.remove();
  }
}

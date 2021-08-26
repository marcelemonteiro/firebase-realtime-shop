import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Product } from '../shared/Product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.fetchProducts();

    const productRes = this.productService.getProductList();

    productRes.snapshotChanges().subscribe(res => {
      this.products = [];
      res.forEach(item => {
        const p = item.payload.toJSON();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        p['$key'] = item.key;
        this.products.push(p as Product);
      });
    });
  }

  fetchProducts() {
    this.productService.getProductList().valueChanges().subscribe(res => console.log(res));
  }

  deleteProduct(id: string) {
    console.log(id);

    if (window.confirm('Do you really want to delete?')) {
      this.productService.deleteProduct(id);
    }
  }

  addToCart(id, quantidade) {
    this.cartService.addToCart(id, quantidade);
  }

}

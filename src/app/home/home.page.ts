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

  deleteProduct(id: string) {
    if (window.confirm('Do you really want to delete?')) {
      this.productService.deleteProduct(id);
    }
  }

  addToCart(idProduto: string, quantidade: number) {
    this.cartService.addToCart(idProduto, quantidade);
  }

}

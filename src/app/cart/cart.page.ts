import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  // Tentar usar Set!
  cart = [];
  products = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {

  }

  ngOnInit() {
    this.fetchProducts();

    const cartRes = this.cartService.getCartList();
    cartRes.snapshotChanges().subscribe(res => {
      this.cart = [];
      this.products = [];
      res.forEach(item => {
        const c = item.payload.toJSON();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        // c['$key'] = item.key;
        this.cart.push(c);

        this.cart.forEach(cart => {
          this.productService.getProduct(cart.idProduto).valueChanges().subscribe(data => {
            this.products.push({ cardItemId: item.key, ...data });
          });
        });
        console.log(this.products);
      });
    });
  }

  fetchProducts() {
    this.productService.getProductList().valueChanges().subscribe(res => console.log(res));
  }

  removeItem(cardItemId: string) {
    this.cartService.removeItem(cardItemId);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productForm: FormGroup;

  constructor(
    private service: ProductService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      category: ['']
    });
  }

  formSubmit() {
    if (!this.productForm.valid) {
      return false;
    } else {
      this.service.createProduct(this.productForm.value).then(res => {
        this.productForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log('ERRO =>' + error));
    }
  }

}

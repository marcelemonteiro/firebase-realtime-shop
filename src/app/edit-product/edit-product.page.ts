import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  updateProductForm: FormGroup;
  productId: string;

  constructor(
    private service: ProductService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.productId = this.actRoute.snapshot.paramMap.get('id');
    this.service.getProduct(this.productId).valueChanges().subscribe(res => {
      this.updateProductForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      name: [''],
      price: [''],
      category: ['']
    });

    console.log(this.updateProductForm.value);
  }

  updateFormSubmit() {
    this.service.updateProduct(this.productId, this.updateProductForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

}

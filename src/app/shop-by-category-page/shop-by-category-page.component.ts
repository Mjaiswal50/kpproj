import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop-by-category-page',
  templateUrl: './shop-by-category-page.component.html',
  styleUrls: ['./shop-by-category-page.component.css']
})
export class ShopByCategoryPageComponent implements OnInit {
@Input() showFormVar:any;
  productSubmitForm: any;
  constructor(private productsService:ProductsService) {
  }
  callPostApi(){
    console.log("productFormValue()", this.productSubmitForm.value);
    this.productsService.addProduct(this.productSubmitForm.value).subscribe((res)=>{
console.log(res,"callapi");
})
  }
  ngOnInit(): void {
    this.productSubmitForm=new FormGroup({
      image: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required])
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-shop-by-category-page',
  templateUrl: './shop-by-category-page.component.html',
  styleUrls: ['./shop-by-category-page.component.css']
})
export class ShopByCategoryPageComponent implements OnInit {
  @Input() showFormVar: any;
  productSubmitForm: any;
  categories:any="";
  oldCategory = "reset";
  constructor(private productsService: ProductsService) {
  }
  callPostApi() {
    console.log("productFormValue()", this.productSubmitForm.value);
    this.productsService.addProduct(this.productSubmitForm.value).subscribe((res) => {
      console.log(res, "callapi");
      //resetting form
      this.productSubmitForm.patchValue({
        image: "",
        title: "",
        description: "",
        price: "",
        category: ""
      });
    })
  }
  ngOnInit(): void {
    this.productSubmitForm = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required])
    });
    this.productsService.categoryArray.subscribe(res=>{
      this.categories = res;
    });
    console.log("xmx",this.categories);
  }
  callProductFilter(catNamez: any) {
    if (this.oldCategory !== catNamez) {
      this.productsService.filterCategory(catNamez);
      this.oldCategory = catNamez;
    }
  }
}

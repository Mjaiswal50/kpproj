import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop-by-category-page',
  templateUrl: './shop-by-category-page.component.html',
  styleUrls: ['./shop-by-category-page.component.css']
})
export class ShopByCategoryPageComponent implements OnInit {
@Input() showFormVar:any;
formValue:any;
  constructor(private productsService:ProductsService) {

  }
  callPostApi(){
    this.productsService.addProduct({
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic'
}).subscribe((res)=>{
alert(res);
})
  }
  ngOnInit(): void {
  }

}

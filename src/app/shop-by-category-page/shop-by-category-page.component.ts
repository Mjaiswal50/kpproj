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
    this.productsService.addProduct(
      {
        "id": 5,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "rating": {
          "rate": 2.1,
          "count": 430
        }
      }
).subscribe((res)=>{
alert(res);
})
  }
  ngOnInit(): void {
  }

}

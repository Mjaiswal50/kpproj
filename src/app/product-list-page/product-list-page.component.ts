import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit,AfterViewInit {
products:any=[];
listVar:boolean=true;

  constructor( private httpclient:HttpClient , private productsService:ProductsService) {

  }

  ngOnInit(): void {
    this.productsService.products.subscribe((res: any) => {
      console.log("oninit", (res));
      this.products = res;
    });
 
}

  ngAfterViewInit(): void {
    console.log("after");
    this.productsService.fetchProducts().subscribe(() => {
    }
    )
  } 


  listViewSet(e:Event) {
  e.preventDefault();
  this.listVar=true;
}
  gridViewSet(e:Event) {
  e.preventDefault();
  this.listVar=false;
}

}

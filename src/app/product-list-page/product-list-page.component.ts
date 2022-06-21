import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpreqService } from '../services/httpreq.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit,OnChanges {
products:any=[];
productsObs:any;
  constructor( private httpclient:HttpClient) {

  }

  ngOnInit(): void {
    this.httpclient.get("https://fakestoreapi.com/products").subscribe((res: any)=>{
      console.log(res);
     this.products=res;
});

}
  ngOnChanges(changes: SimpleChanges): void {

  }

}

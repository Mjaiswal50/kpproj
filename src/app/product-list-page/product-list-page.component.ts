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

@ViewChild('gridContainer') gridContainer:any;

  constructor( private httpclient:HttpClient , private productsService:ProductsService) {

  }

  ngOnInit(): void {
  this.productsService.products.subscribe((res: any) => {
    console.log("mj", Object.entries(res));
      this.products = res;
    });
}

  ngAfterViewInit(): void {
    this.productsService.fetchProducts().subscribe(()=>{
    }
    )
  } 


  listViewSet(e:Event) {
  // var $gridCont = this.gridContainer.nativeElement;
  e.preventDefault();
  // $gridCont.classList.add('list-view');
  this.listVar=true;
}
  gridViewSet(e:Event) {
  // var $gridCont = this.gridContainer.nativeElement;
  e.preventDefault();
  // $gridCont.classList.remove('list-view');
  this.listVar=false;
}

}

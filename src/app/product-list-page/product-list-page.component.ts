import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CartsService } from '../services/carts.service';
import { ProductsService } from '../services/products.service';
import { map, tap, take, switchMap, filter } from 'rxjs/operators';
/* @ts-ignore */
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit, AfterViewInit {
  products: any = [];
  listVar: boolean = true;

  constructor(private httpclient: HttpClient, private productsService: ProductsService, private cartsService: CartsService) {
  }


  ngOnInit(): void {
    this.productsService.products.subscribe((res: any) => {
      console.log("oninit", (res));
      this.products = res;
    });
    this.cartsService.fetchProductsFromCart().subscribe(res => {
      console.log("doubt1", res);
    })
  }

  ngAfterViewInit(): void {
    console.log("after");
    this.productsService.fetchProducts().subscribe(() => {
    }
    )
    //     this.cartsService.fetchProductsFromCart().subscribe(res => {
    //   console.log("doubt1", res);
    // })
  }


  addToCart(product: any) {
    /* @ts-ignore */
    this.cartsService.fetchProductsFromCart().subscribe((res:any)=>{
      /* @ts-ignore */
      this.cartsService.addToCart(product).subscribe((cart: any) => {
        console.log("Added Product Encrypt Name", cart.name);
        
      }
      )
    });
  }

  listViewSet(e: Event) {
    e.preventDefault();
    this.listVar = true;
  }
  gridViewSet(e: Event) {
    e.preventDefault();
    this.listVar = false;
  }

  filterbycategory() {
    console.log(1234, this.products)
  }


}

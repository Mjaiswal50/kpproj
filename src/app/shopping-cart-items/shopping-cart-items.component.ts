import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
  styleUrls: ['./shopping-cart-items.component.css']
})
export class ShoppingCartItemsComponent implements OnInit ,AfterViewInit {
  cartItems:any;
  totalCheckoutPrice:any=0;

  constructor(private cartsService: CartsService) { }

  ngOnInit(): void {
    this.cartsService.cartProducts.subscribe(res => {
      console.log("done",res)
      this.cartItems=res;
      for(let p of res) {
        this.totalCheckoutPrice += p.price;
      }
      this.totalCheckoutPrice=Math.round(this.totalCheckoutPrice);
    });
    
    // this.totalCheckoutPrice=this.cartItems;
  }
  ngAfterViewInit(){
    this.cartsService.fetchProductsFromCart().subscribe(res => {
      console.log("donefetchingcartsi", res);
    });
  }

  deleteItem(uid:any){
    this.cartsService.cartProducts.subscribe(res=>console.log("target to find id",res));
    this.cartsService.deleteProductFromCart(uid).subscribe(res=>console.log("firsttsdelete",res))
  }
}

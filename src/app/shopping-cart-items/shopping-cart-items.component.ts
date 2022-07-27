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
  disableVar:any=true;
  constructor(private cartsService: CartsService) { }

  ngOnInit(): void {
    this.cartsService.cartProducts.subscribe(res => {
      console.log("done",res)
      this.cartItems=res;
      this.totalCheckoutPrice=0;
      for(let p of res) {
        this.totalCheckoutPrice += p.price*p.quantity;
      }
      this.totalCheckoutPrice=(this.totalCheckoutPrice);
      if(this.totalCheckoutPrice==0){
        this.disableVar=true;
      }else{
        this.disableVar = false;
      }
    });
    // this.totalCheckoutPrice=this.cartItems;
  }
  ngAfterViewInit(){
    this.cartsService.fetchProductsFromCart().subscribe(res => {
      console.log("donefetchingcartsi", res);
    });
  }
  inc(item:any){
    this.cartsService.incrCartItem(item).subscribe(res=>{
      this.cartsService.fetchProductsFromCart().subscribe();
    })
  }
  dec(item:any){
    this.cartsService.decrCartItem(item).subscribe(res => {
      this.cartsService.fetchProductsFromCart().subscribe();
    })
  }
  deleteItem(uid:any){
    this.cartsService.deleteProductFromCart(uid).subscribe(res=>console.log("firsttsdelete",res))
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, take, switchMap, filter } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  encryptName: any;
  flag = false;
  private _cartProducts = new BehaviorSubject<Product[]>([]);
  oldCartProduct: any;
  incrProduct: any
  constructor(private httpClient: HttpClient) {
  }

  get cartProducts() {
    return this._cartProducts.asObservable();
  }
   // @ts-ignore: Object is possibly 'null'.
  addToCart(product: any) {
    this.flag = true;
    console.log("direct", this._cartProducts.value);
    for (let key of this._cartProducts.value) {
      if (key.title == product.title) {
        this.flag = false;
        let nq = key.quantity+1;
        this.incrProduct = { ...key,quantity:nq};
        this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + key.uid + '.json', this.incrProduct 
        ).pipe(take(1)).subscribe(res=>{
          console.log("in");
          return this.fetchProductsFromCart();
        })
      }
    }
    if(this.flag){
      return this.httpClient.post<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts.json', product
      ).pipe(take(1), tap((NewproductName: any) => {
        return this.fetchProductsFromCart().subscribe(oldProducts => {
          let numz = oldProducts.length - 1;
          let newProducts = oldProducts[numz];
          console.log("ColdProducts", oldProducts);
          this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + NewproductName.name + '.json', { ...newProducts, uid: NewproductName.name, quantity: 0 }
          ).subscribe((res) => {
            console.log("winwin", res);
          })
        })
      }));
    }

 

  }

  //   ).pipe(switchMap((res) => {
  //     this.encryptName = res;
  //     return this.cartProducts;

  //   }), take(1), tap((arrayz: any) => {
  //     this._cartProducts.next(arrayz.concat({ ...product, uid: this.encryptName }))
  //     // return this.fetchProductsFromCart().subscribe(oldProducts => {
  //       let numz = arrayz.length - 1;
  //     let newProducts = arrayz[numz];
  //     console.log("ColdProducts", arrayz);
  //     this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + this.encryptName.name + '.json', { ...newProducts, uid: this.encryptName.name }
  //       ).subscribe((res) => {
  //         console.log("winwin", res);
  //       })
  //     })
  //   // })
  //   );
  // }

  fetchProductsFromCart() {
    return this.httpClient.get<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts.json').pipe(
      map(resData => {
        const cartProducts: any =   [];
        for (const value of Object.values(resData)) {
          cartProducts.push(value);
        }
        console.log("finalcartproducts", cartProducts);
        return cartProducts;
      }),
      tap(cartProducts => {
        this._cartProducts.next(cartProducts);
      })
    );
  }

  incrCartItem(item: any) {
    let newItem = { ...item, quantity:item.quantity+1}
    return this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + newItem.uid + '.json', newItem
    )
    
  }
  decrCartItem(item: any) {
    let newItem = { ...item, quantity: item.quantity-1}
    return this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/' + newItem.uid + '.json', newItem
    )
  }


  deleteProductFromCart(deletedItemName: any) {
    return this.httpClient
      .delete(
        `https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/${deletedItemName}.json`
      ).pipe(switchMap((res): any => {
        return this.cartProducts
      }), take(1), map((cartProducts: any) => {
        this._cartProducts.next(cartProducts.filter((b: any) => b.uid !== deletedItemName))
      }))
    //   switchMap((res:any) => {
    //   // this.bookings
    //     console.log("deleted response",res);
    //  return res;
    //   }
    //   ),
    //   take(1),
    //   tap((cartProducts:any) => {
    //     // this._cartProducts.next(cartProducts.filter((b: { name: any; }) => b.name !== deletedItemName));
    //   })
    //  );
  }
}

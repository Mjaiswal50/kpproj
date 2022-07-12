import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private _cartProducts = new BehaviorSubject<Product[]>([]);
  constructor(private httpClient: HttpClient) { 
  }
  tempObj:any="";
  get cartProducts() {
    return this._cartProducts.asObservable();
  }
  addToCart(product: any) {
    return this.httpClient.post<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts.json', product
    ).pipe(take(1), tap((NewproductName: any) => {
      return this.fetchProductsFromCart().subscribe(oldProducts => {
        let numz = oldProducts.length-1;
        let newProducts = oldProducts[numz];
       console.log("ColdProducts", oldProducts);
        this.httpClient.put<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/'+NewproductName.name+'.json', { ...newProducts, uid: NewproductName.name }
        ).subscribe((res) => {
          console.log("winwin",res);
        })
      })}));
  }

  // encryptUpdate(data:any){
  //   this.cartProducts.pipe(take(1)).subscribe(res => {
  //     console.log("resconsole", data, res[0]);
  //      this.tempObj = res[0];
  //   })
  //   return this.httpClient.put<any>(`https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/${data}.json`, { ...this.tempObj ,uid:data}
  //   ).subscribe(()=>{
  //     console.log("winwin");
  //   })
  // //   console.log("xxxqq");
  // //   this.cartProducts.pipe(take(1 )).subscribe(res=>{
  // //   console.log("resconsole",data,res);
  // //     const tempObj = res[0];
  // //   const updatedObj={...res,uid:data};
  // //    this._cartProducts.next(updatedObj);
  // //  })
  // }

  fetchProductsFromCart() {
      return this.httpClient.get<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/carts.json').pipe(
      map(resData => {
        const cartProducts: any = [];
        for (const key of Object.values(resData)) {
          cartProducts.push(key);
        }
        console.log("finalcartproducts", cartProducts);
        return cartProducts;
      }),
      tap(cartProducts => {
        this._cartProducts.next(cartProducts);
      })
    );
  }
  deleteProductFromCart(deletedItemName:any){
    return this.httpClient
      .delete(
        `https://onlineshoppingapi-default-rtdb.firebaseio.com/carts/${deletedItemName}.json`
      )
      // .pipe(
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
      // );
  }
}

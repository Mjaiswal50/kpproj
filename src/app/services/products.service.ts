import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, take, switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _products = new BehaviorSubject<any>([]);

  constructor(private httpclient: HttpClient) { }
  get products() {
   return this._products.asObservable();
}
  fetchProducts(){
    return this.httpclient.get("https://fakestoreapi.com/products").pipe(tap(res => {
      this._products.next(res);
    }));
  }
  addProduct(productDetail:any){
    console.log("mj1",productDetail);
    return this.httpclient.post<any>('https://fakestoreapi.com/products',
      productDetail
    ).pipe(tap(res=>{
      console.log(res,"res");
      return res;
    }))
    // ).pipe(take(1), tap((Newproduct:any)=>{
    //   Newproduct = Newproduct.json()
    //   console.log(Newproduct,"mj2")
    //  return this.fetchProducts().subscribe(oldProducts=>{
    //   console.log("mj3",oldProducts);
    //   return null;
    //     // return this._products.next(oldProducts.concat(Newproduct));
    //   })
    // }));
  }
}

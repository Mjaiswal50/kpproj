import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, take, switchMap, map } from 'rxjs/operators';
import { Product } from '../Models/product.model';

interface ProductData {
  id: number;
  description: string;
  image: string;
  price: number;
  title: string;
  category: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _products = new BehaviorSubject<Product[]>([]);

  constructor(private httpclient: HttpClient) { }
  get products() {
   return this._products.asObservable();
}
  fetchProducts(){
    return this.httpclient.get("https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts.json").pipe(
    //   take(1), tap(res => {
    //   this._products.next(res);
    // })
      map(resData => {
        const products:any = [];
        console.log("resdata",Object.values(resData))
        for (const key of Object.values(resData)) {
          console.log("xxx",key);
          products.push(key);
        }
        console.log("finalproducts",products);
        return products;
      }),
      tap(products => {
        this._products.next(products);
      })
    );
  }
  addProduct(productDetail:any){
    console.log("mj1",productDetail);
    return this.httpclient.post<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts.json',
      productDetail
    ).pipe(take(1), tap(res=>{
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

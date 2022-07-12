import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, take, switchMap, map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

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
        for (const key of Object.values(resData)) {
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
    console.log("yy",this._products.value.length);
    let newId = this._products.value.length + 1;
    return this.httpclient.post<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/allproducts.json',
      { ...productDetail, id: newId }
    ).pipe(take(1), tap((Newproduct:any)=>{
      console.log(Newproduct,"mj2")
     return this.fetchProducts().subscribe(oldProducts=>{
      console.log("mj3",oldProducts);
      return this._products.next(oldProducts);
      })
    }));
  }
}

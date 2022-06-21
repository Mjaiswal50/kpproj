import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpreqService {

  constructor(private httpclient:HttpClient) { }

  getapi(url:any,data:any){
    return this.httpclient.get(url);
  }


}

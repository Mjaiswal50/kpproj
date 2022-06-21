import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-cart-page',
  templateUrl: './your-cart-page.component.html',
  styleUrls: ['./your-cart-page.component.css']
})
export class YourCartPageComponent implements OnInit {
formvarkey:any;
formvarvalue:any;
objz:any={formkey:"formvalue"};
  constructor() { }

  ngOnInit(): void {
  }

}

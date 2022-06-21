import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-by-category-page',
  templateUrl: './shop-by-category-page.component.html',
  styleUrls: ['./shop-by-category-page.component.css']
})
export class ShopByCategoryPageComponent implements OnInit {
@Input() showFormVar:any;
  constructor() { }

  ngOnInit(): void {
  }

}

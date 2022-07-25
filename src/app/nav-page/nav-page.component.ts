import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.css']
})
export class NavPageComponent implements OnInit {
  toastVar=false;
  searchForm: FormGroup;
  constructor(private productsService:ProductsService) { 
    this.searchForm=new FormGroup({
      Svalue : new FormControl("",Validators.required)
    })
  }
  searching(){
     var Sfvalue = this.searchForm.value;
    console.log(Sfvalue);
    this.productsService.categoryArray.pipe(take(1)).subscribe(res=>{
      let bool = res.includes(Sfvalue.Svalue);
      console.log(bool);
      if(!bool){
       this.toastVar=true;
       setTimeout(()=>{
        this.toastVar=false;
       },3000)
      }
    })
    this.productsService.filterCategory(Sfvalue.Svalue);
  }
  ngOnInit(): void {
  }

}

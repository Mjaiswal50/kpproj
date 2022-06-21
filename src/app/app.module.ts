import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavPageComponent } from './nav-page/nav-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ShopByCategoryPageComponent } from './shop-by-category-page/shop-by-category-page.component';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { ShoppingCartItemsComponent } from './shopping-cart-items/shopping-cart-items.component';
import { YourCartPageComponent } from './your-cart-page/your-cart-page.component';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavPageComponent,
    CartPageComponent,
    ShopByCategoryPageComponent,
    ProductListPageComponent,
    ShoppingCartItemsComponent,
    YourCartPageComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SearchPipe } from './pipe/search.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    SearchPipe,
    ProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class ProductsModule { }

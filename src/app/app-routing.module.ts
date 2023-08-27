import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  {path:"",component:AllProductsComponent},
  {path:"product-details/:id",component:ProductDetailsComponent},
  {path:"products/:category",component:AllProductsComponent},
  {path:"cart",component:CartComponent},
  {path:"**",component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
})
export class CartsModule {}

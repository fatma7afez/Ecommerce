import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NotfoundComponent
  ]
})
export class SharedModule { }

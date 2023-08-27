import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  mainUrl:string = `https://fakestoreapi.com/`

  constructor(private _httpclient:HttpClient) { }

  getAllCategroies(){
   return this._httpclient.get(this.mainUrl+`products/categories`)
  }
}

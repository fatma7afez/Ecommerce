import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  mainUrl: string = `https://fakestoreapi.com/`;

  constructor(private _httpclient: HttpClient) {}

  addToCart(model: any) {
    return this._httpclient.post(`${this.mainUrl}carts`, model);
  }
}

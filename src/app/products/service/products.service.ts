import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  mainUrl: string = `https://fakestoreapi.com/products/`;
  searchKey = new BehaviorSubject('');
  constructor(private _httpClient: HttpClient) {}

  getAllProducts() {
    return this._httpClient.get<Product[]>(this.mainUrl);
  }

  getProductDetails(id: string) {
    return this._httpClient.get<Product[]>(this.mainUrl + id);
  }

  getProductsCategory(category: string) {
    return this._httpClient.get<Product[]>(
      `${this.mainUrl}/category/${category}`
    );
  }
}

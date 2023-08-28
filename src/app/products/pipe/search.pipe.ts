import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchKey: string): Product[] {
    console.log(searchKey)
    if (products.length == 0 || searchKey== '') {
      return products;

    } else {
      const result: Product[] = [];
      for (let product of products) {
        if (
          product.title
            .trim()
            .toLocaleLowerCase()
            .includes(searchKey.toLocaleLowerCase())
        ) {
          result.push(product);
        }
      }
      return result;
    }
  }
}

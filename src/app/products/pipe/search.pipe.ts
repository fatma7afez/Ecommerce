import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchKey: string): Product[] {
    if (products.length == 0 || searchKey== null) {
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
      console.log(result)

      return result;
    }
  }
}

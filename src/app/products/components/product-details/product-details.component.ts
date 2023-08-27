import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: string = '';
  product!: Product;
  isLoading: boolean = false;
  rate: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.onGetIdFromUrl();
  }

  onGetIdFromUrl() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProductDetails(this.id);
    });
  }

  getProductDetails(id: string) {
    this.isLoading = true;
    this._productsService
      .getProductDetails(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((prod: any) => {
        this.product = prod;
        // this.rate = Math.floor(this.product.rating.rate)
        this.rate = this.product.rating.rate;
      });
  }
}

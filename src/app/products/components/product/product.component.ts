import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() productData!: Product;
  @Output() selectProduct = new EventEmitter();
  addToCart: boolean = false;
  amount: number = 1;
  constructor(private _router: Router) {}

  ngOnInit(): void {
  }

  // change title to be suitable with card
  displayTitleOfProduct(title: string) {
    const productTitle = title.split(' ').slice(0, 3).join(' ');
    return productTitle;
  }

  // onNagivateToProductDetails
  onNagivateToProductDetails(id: number) {
    this._router.navigate([`/product-details/${id}`]);
  }

  onAdd() {
    this.selectProduct.emit({
      item: this.productData,
      quantity: this.amount,
    });
  }

  // addToCartFlag() {
  //   this.addToCart = !this.addToCart;
  //   console.log(this.addToCart);
  // }

  onGoToBuyNow(){
    this._router.navigate([`/cart`]);
  }
}

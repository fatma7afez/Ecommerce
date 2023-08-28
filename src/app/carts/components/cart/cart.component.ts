import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/model/product.model';
import { CartService } from '../../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Cart } from '../../model/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selectProducts: any[] = [];
  totalOfAllProducts: number = 0;
  isLoading: boolean = false;
  loadingButton: boolean = false;

  constructor(
    private _router: Router,
    private _cartApi: CartService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getAllProcductsOfCart();
  }

  // all get products
  getAllProcductsOfCart() {
    if (localStorage.getItem('cart') !== null) {
      this.selectProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    }
    this.getTotalOfAllProducts();
  }

  // get total price of dividual products
  getTotalOfDivProduct(index: number) {
    let total =
      this.selectProducts[index].item.price *
      this.selectProducts[index].quantity;
    return total;
  }

  // minsQuantity
  onMinsQuantity(index: number) {
    if (this.selectProducts[index].quantity-- > 1) {
      this.selectProducts[index].quantity--;
    } else {
      this.selectProducts[index].quantity = 1;
    }
    this.updatedCart();
    this.getTotalOfAllProducts();
  }

  //change Quantity when typing in field
  onChangeQuantity(index: number) {
    if (this.selectProducts[index].quantity > 1) {
      this.selectProducts[index].quantity;
    } else {
      this.selectProducts[index].quantity = 1;
    }
    this.updatedCart();
    this.getTotalOfAllProducts();
  }

  // PlusQuantity
  onPlusQuantity(index: number) {
    this.selectProducts[index].quantity++;
    this.updatedCart();
    this.getTotalOfAllProducts();
  }

  // get total price of all products
  getTotalOfAllProducts() {
    this.totalOfAllProducts = 0;
    for (let index = 0; index < this.selectProducts.length; index++) {
      this.totalOfAllProducts +=
        this.selectProducts[index].item.price *
        this.selectProducts[index].quantity;
    }
    return this.totalOfAllProducts;
  }

  //delete product of carts
  onDeleteProduct(index: number) {
    console.log(index)
    console.log(this.selectProducts)

    this.selectProducts.splice(index, 1);
    this.getTotalOfAllProducts();
    this.updatedCart();
  }

  // change title to be suitable with card
  displayTitleOfProduct(title: string) {
    const productTitle = title.split(' ').slice(0, 5).join(' ');
    return productTitle;
  }

  // go to shop more
  onShopMore() {
    this._router.navigate([`/`]);
  }

  // on getting order data to make like that api wanna it
  onGetCheckOutData() {
    this.loadingButton = true;
    let productList: any[] = [];
    for (let index = 0; index < this.selectProducts.length; index++) {
      productList.push({
        productId: this.selectProducts[index].item.id,
        quantity: this.selectProducts[index].quantity,
      });
    }
    let orderData: Cart = {
      userId: 5,
      date: new Date(),
      products: productList,
    };
    this.sendCheckOutData(orderData);
  }

  // send order data to api to checkout
  sendCheckOutData(order: Cart) {
    this._cartApi
      .addToCart(order)
      .pipe(finalize(() => (this.loadingButton = false)))
      .subscribe((res) => {
        if (res) {
          this.openSnackBar(
            'Well done , your order is Successfully send',
            'close'
          );
          this.selectProducts = [];
          this.updatedCart();
          this._router.navigate([`/`]);
        }
      });
  }

  //updated Cart
  updatedCart() {
    localStorage.setItem('cart', JSON.stringify(this.selectProducts));
  }
  // toaster
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}

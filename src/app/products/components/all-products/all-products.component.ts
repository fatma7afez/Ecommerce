import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  category: string = '';
  searchKey: string = '';
  isLoading: boolean = false;
  selectProducts: Product[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.onGetCategoryFromUrlAndCheckCategory();
    this.getSearchKey();
  }

  // get all products
  getProducts() {
    this.isLoading = true;
    this._productsService
      .getAllProducts()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((prod) => {
        this.products = prod;
      });
  }

  //Get category from url and check category if has category or not to get all data
  onGetCategoryFromUrlAndCheckCategory() {
    this._route.params.subscribe((params) => {
      this.category = params['category'];
      if (this.category == undefined) {
        this.getProducts();
      } else {
        this.getAllProductsOfCategory(this.category);
      }
    });
  }

  // get all products of category
  getAllProductsOfCategory(category: string) {
    this.isLoading = true;
    this._productsService
      .getProductsCategory(category)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((prod: any) => {
        this.products = prod;
      });
  }

  // get search key of header
  getSearchKey() {
    this._productsService.searchKey.subscribe((key: string) => {
      this.searchKey = key;
    });
  }

  // stop subscribe on searchKey after go out the page
  ngOnDestroy(): void {
    this._productsService.searchKey.next('');
    this._productsService.searchKey.complete();
  }

  // add to cart
  addToCart(product: any) {
    if (localStorage.getItem('cart') === null) {
      this.selectProducts.push(product);
      localStorage.setItem('cart', JSON.stringify(this.selectProducts));
    } else {
      this.selectProducts = JSON.parse(localStorage.getItem('cart') || '[]');
      let existProduct = this.selectProducts.find(
        (prod: any) => prod.item.id == product.item?.id
      );
      if (!existProduct) {
        this.selectProducts.push(product);
        localStorage.setItem('cart', JSON.stringify(this.selectProducts));
      } else {
        alert('exist');
      }
    }
  }
}

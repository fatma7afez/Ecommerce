import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/categories.service';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/products/service/products.service';
import {
  NavigationStart,
  Router,
  Event as NavigationEvent,
  NavigationEnd,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories$!: Observable<any>;
  event$: any;
  currectUrl: string = '';
  constructor(
    private _categoriesApi: CategoriesService,
    private _productsService: ProductsService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.getAllCategoriesForNav();
    this.GetCurrentUrl();
  }

  // get current url to appear search
  GetCurrentUrl() {
    this.event$ = this._router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        this.currectUrl = event.url;
      }
    });
  }

  // get all categories of navbar
  getAllCategoriesForNav() {
    this.categories$ = this._categoriesApi.getAllCategroies();
  }

  //  search of products
  onSearchOfProductS(key: any) {
    const searchKey = key.target.value;
    console.log(searchKey)
    this._productsService.searchKey.next(searchKey);
  }
}

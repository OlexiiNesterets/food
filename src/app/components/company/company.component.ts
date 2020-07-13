import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { fromEvent, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

  company: any;
  activeCategory: any;
  dishes: any;
  dishesPlaceholders: any;
  offset = 0;
  dishesAreLoading: boolean;
  scrollSubscription: Subscription;
  currentSection = 'menu';


  @ViewChild('menu', { static: false })
  menu: ElementRef;

  constructor(
    private http: HttpService,
    private cartService: CartService,
    public categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.activeCategory = this.categoriesService.categories[0];
    this.getCompany().subscribe(company => {
      this.company = company;
      console.log(company);
      this.company['translatedAttributes'] = JSON.parse(company['translatedAttributes']);
      this.getDishes(this.activeCategory.id);
    });

    this.trackScroll();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  trackScroll() {
    if (this.currentSection !== 'menu') {
      return;
    }
    this.scrollSubscription = fromEvent(window, 'scroll').subscribe(res => {
      const windowsBottom = window.pageYOffset + document.documentElement.clientHeight;
      let bottomOfDiv = this.menu.nativeElement.scrollHeight + this.menu.nativeElement.offsetTop;
      let borderToLoadNewDiv = bottomOfDiv * 0.75;
      if (windowsBottom > borderToLoadNewDiv && !this.dishesAreLoading) {
        this.getDishes(this.activeCategory.id);
      }
    });
  }

  getCompany() {
    return this.http.getCompany();
  }

  getDishes(categoryId) {
    const limit = 10;
    this.dishesAreLoading = true;
    this.dishesPlaceholders = new Array(6);
    this.http.getDishes({
      limit: 10,
      offset: this.offset,
      categoryId
    }).subscribe((dishes: any) => {
      this.dishesPlaceholders = null;
      if (!dishes.length) {
        this.scrollSubscription.unsubscribe();
        return;
      }
      if (this.dishes) {
        this.dishes = this.dishes.concat(dishes);
      } else {
        this.dishes = dishes;
      }
      this.offset += 10;
      this.dishesAreLoading = false;
    });
  }

  setCategory(category) {
    if (category === this.activeCategory) {
      return;
    }
    this.activeCategory = category;
    this.offset = 0;
    this.dishes = null;
    this.scrollSubscription.unsubscribe();
    this.getDishes(this.activeCategory.id);
    this.trackScroll();
    window.scrollTo(0, 0);
  }

  setSection(sectionName) {
    if (sectionName === this.currentSection) {
      return;
    }
    this.currentSection = sectionName;
    this.scrollSubscription.unsubscribe();
    this.trackScroll();
    window.scrollTo(0, 0);
  }

}

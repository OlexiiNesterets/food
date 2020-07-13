import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'https://misteram.com.ua/api/';
  companyUrl = `${this.baseUrl}city/1/companies/971`;
  companyDishesUrl = 'https://misteram.com.ua/api/company/971/dishes?base_category_id=&limit=8&offset=90';

  constructor(private http: HttpClient) { }

  getCompany() {
    return this.http.get(this.companyUrl);
  }

  getDishes({limit = 15, offset = 0, categoryId = ''}) {
    const companyDishesUrl = `${this.baseUrl}company/971/dishes?base_category_id=${categoryId}&limit=${limit}&offset=${offset}`;
    return this.http.get(companyDishesUrl);
  }
}

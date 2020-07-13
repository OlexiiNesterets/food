import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private headerSubject = new Subject();

  constructor() { }

  public notify() {
    this.headerSubject.next();
  }

  public modalListener() {
    return this.headerSubject.asObservable();
  }
}

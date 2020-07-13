import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartItems = new Map();

  private cartStore = new BehaviorSubject(this.cartItems);
  private showCartObservable = new Subject();

  public cartState() {
    return this.cartStore.asObservable();
  }

  public addItem(item) {
    if (this.cartItems.get(item.id)) {
      this.cartItems.get(item.id).quantity++;
    } else {
      this.cartItems.set(item.id, {
        product: item,
        quantity: 1
      })
    }
    console.log(this.cartItems);
    this.cartStore.next(this.cartItems);
  }

  public removeItem(item) {
    if (!this.cartItems.get(item.id)) {
      return;
    }
    if (this.cartItems.get(item.id).quantity > 1) {
      this.cartItems.get(item.id).quantity--;
    } else {
      this.cartItems.delete(item.id);
    }
    this.cartStore.next(this.cartItems);
  }

  public showCart() {
    return this.showCartObservable.asObservable();
  }

  public invokeCart(invoke: boolean) {
    this.showCartObservable.next(invoke);
  }

  public getCartItems() {
    return this.cartItems;
  }

  public getTotalQuantity() {
    let totalQuantity = 0;
    for (let item of this.cartItems.values()) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  }

  public getTotalPrice() {
    let totalPrice = 0;
    for (let item of this.cartItems.values()) {
      const itemPrice = item.product.dishNewPrice ? item.product.dishNewPrice : item.product.price;
      totalPrice += itemPrice * item.quantity;
    }
    return totalPrice;
  }

  public cartCleanUp() {
    this.cartItems = new Map();
    this.cartStore.next(this.cartItems);
  }

}

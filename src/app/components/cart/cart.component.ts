import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { CartService } from '../../services/cart.service';
import * as _ from "lodash";
import { Subscription } from 'rxjs';
import { HeaderService } from '../../services/header.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(
    public cartService: CartService,
    public headerService: HeaderService,
    private renderer: Renderer2) { }

  public cart: any
  private cartStateSubscription: Subscription;
  private wasChanged: boolean;
  public clearAttempt: boolean;
  public makeOrder: boolean;

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'scroll-block');
    this.headerService.notify();
    this.cartStateSubscription = this.cartService.cartState().subscribe(cart => {
      if (!this.wasChanged) {
        this.cart = _.cloneDeep(cart);
      }
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'scroll-block');
    this.headerService.notify();
    this.cartStateSubscription.unsubscribe();
  }

  public addItem(item) {
    this.wasChanged = true;
    if (this.cart.get(item.product.id)) {
      this.cart.get(item.product.id).quantity++;
    } else {
      this.cart.set(item.product.id, {
        product: item,
        quantity: 1
      });
    }
    this.cartService.addItem(item.product);
  }

  public removeItem(item) {
    this.wasChanged = true;
    if (!this.cart.get(item.product.id)) {
      return;
    }
    if (this.cart.get(item.product.id).quantity > 1) {
      this.cart.get(item.product.id).quantity--;
    } else {
      this.cart.get(item.product.id).quantity = 0;
    }
    this.cartService.removeItem(item.product);
  }

  public cartCleanUp() {
    this.cartService.cartCleanUp();
    this.cart = null;
    this.clearAttempt = false;
  }

  public toMakeOrder() {
    this.cartCleanUp();
    this.makeOrder = true;
  }
}
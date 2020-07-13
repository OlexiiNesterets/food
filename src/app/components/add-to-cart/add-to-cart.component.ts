import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit, OnDestroy {

  @Input() dish: any;

  quantity = 0;
  private cartSubscription: Subscription;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartState().subscribe(cart => {
        this.quantity = cart.get(this.dish.id) ? cart.get(this.dish.id).quantity : 0;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

}

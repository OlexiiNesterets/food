import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  showCart: boolean;
  cartSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.showCart().subscribe((showCart:boolean) => {
      this.showCart = showCart;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

}

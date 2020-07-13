import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderService } from 'src/app/services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private headerServiceSubscription: Subscription;
  modalIsOpen: boolean;

  constructor(
    public cartService: CartService,
    public headerService: HeaderService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        'cart',
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/shopping-cart.svg')
      );
    }

  ngOnInit(): void {
    this.headerServiceSubscription = this.headerService.modalListener().subscribe(() => {
      this.modalIsOpen = !this.modalIsOpen;
    })
  }

  ngOnDestroy(): void {
    this.headerServiceSubscription.unsubscribe();
  }

  invokeCart() {
    if (!this.cartService.getCartItems().size) {
      return;
    }

    this.cartService.invokeCart(true);
  }
}

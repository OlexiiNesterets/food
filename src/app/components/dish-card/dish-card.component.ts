import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css'],
})
export class DishCardComponent implements OnInit {

  private _dish: any;
  public showDescription: boolean;
  @Input() isPlaceholder: boolean;

  public imgIsLoaded: boolean;

  get dish() {
    return this._dish;
  }

  @Input('dish') set dish(dish) {
    if (dish.actions.length) {
      const discountId = 2377;
      for (let action of dish.actions) {
        if (action.id === discountId) {
          const dishNewPrice = dish.price - (dish.price * action.discount) / 100; 
          dish.dishNewPrice = dishNewPrice;
        }
      }
    }
    this._dish = dish;
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  onImgLoad() {
    this.imgIsLoaded = true;
  }

}

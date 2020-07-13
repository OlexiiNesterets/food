import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  private _items: any;

  get items() {
    return this._items;
  }

  @Input('items') set items(items) {
    this._items = items;
  }

  @Output() onSelectedItemChanged = new EventEmitter();

  public showList = false;

  @Input() selectedItem: any;

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item?) {
    this.showList = !this.showList;
    if (item && (this.selectedItem !== item)) {
      this.selectedItem = item;
      this.onSelectedItemChanged.emit(this.selectedItem);
    }

  }

}

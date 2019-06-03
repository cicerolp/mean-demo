import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  item: Item;

  constructor() {
    this.title = 'The House Store';
  }

  ngOnInit() {
  }

  public onSelectItem(product: Item): void {
    if (this.item === product) {
      this.item = undefined;
    } else {
      this.item = product;
    }
  }
}

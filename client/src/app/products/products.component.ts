import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ItemService } from './../item.service';
import { Item } from './../item';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  itens: Item[] = [];
  itemSelect: Item;

  @Output() onItem = new EventEmitter<Item>();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.selectAll().then(
      resolve => {
        this.itens = resolve;
      }
    );

    /*this.itens.pushn(new Item(....));
    this.itens.pushn(new Item(....));
    this.itens.pushn(new Item(....));
    this.itens.pushn(new Item(....));*/

    this.itemSelect = this.itens[0];
  }

  public onSelectItem(elt: Item) {

    /*this.itemSelect = elt;*/

    this.onItem.emit(elt);
  }
}

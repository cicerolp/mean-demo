import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ItemService } from './../item.service';
import { Item } from './../item';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() elt: Item;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.itemService.selectId(params['id']);
      })
      .subscribe(item => this.elt = item);
  }

  copy() {
    let copy = { ...this.elt };
    copy._id = undefined;

    this.itemService.insert(copy);
  }

  delete() {
    this.itemService.delete(this.elt._id);
    this.goBack();
  }

  update() {
    this.itemService.update(this.elt._id, this.elt);
  }

  goBack(): void {
    this.location.back();
  }
}

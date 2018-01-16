import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  itemList: Ingredient[];

  constructor(public slService: ShoppingListService){
  }

  ionViewWillEnter(){
    this.loadItems();
  }

  onAddItem(form: NgForm){
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  loadItems(){
    this.itemList = this.slService.getItems();
  }

  removeItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipeService } from '../../services/recipe';
import { ShoppingListPage } from '../shopping-list/shopping-list';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  recipe: Recipe;
  index: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public shopService: ShoppingListService,
    public recipeService: RecipeService) {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditIngredients() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index})
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

  onAddIngredients() {
    this.shopService.addItems(this.recipe.ingredients);
    this.navCtrl.popTo(ShoppingListPage);
  }
}

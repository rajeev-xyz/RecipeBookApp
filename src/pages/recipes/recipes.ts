import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { StoreOptionPage } from '../store-option/store-option';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[] = [];
  constructor(
    public navCtrl: NavController,
    public recipeService: RecipeService,
    public popoverCtrl: PopoverController,
    public loadingCntrl: LoadingController,
    public authService: AuthService) {

  }
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
  }

  presentPopover(evt: MouseEvent) {
    const loader = this.loadingCntrl.create({
      content: 'please wait..!!'
    });

    const popover = this.popoverCtrl.create(StoreOptionPage);
    popover.present({
      ev: evt
    });

    popover.onDidDismiss(
      data => {
        if (data == null) {
          return;
        }
        if (data.action == 'store') {
          loader.present();
          this.authService.getActiveUser().getIdToken()
            .then((token: string) => {
              this.recipeService.storeList(token)
                .subscribe(
                () => loader.dismiss(),
                error => {
                  loader.dismiss();
                  console.log(error);
                }
                )
            })
            .catch(error => console.log("Error in getting token " + error));
        } else if (data.action == 'load') {
          loader.present();
          // Load data from database
          this.authService.getActiveUser().getIdToken()
            .then((token: string) => {
              this.recipeService.loadList(token)
                .subscribe(
                (list: Recipe[]) => {
                  loader.dismiss();
                  if (list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
                  }
                },
                error => {
                  loader.dismiss();
                }
                );
            }
            )
            .catch(error => console.log('Error in getting token ' + error));
        }
      }
    );
  }
}

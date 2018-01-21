import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { StoreOptionPage } from '../store-option/store-option';
import { AuthService } from '../../services/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  itemList: Ingredient[];

  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCntrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  loadItems() {
    this.itemList = this.slService.getItems();
  }

  removeItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
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
              this.slService.storeList(token)
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
              this.slService.loadList(token)
                .subscribe(
                (list: Ingredient[]) => {
                  loader.dismiss();
                  if (list) {
                    this.itemList = list;
                  } else {
                    this.itemList = [];
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

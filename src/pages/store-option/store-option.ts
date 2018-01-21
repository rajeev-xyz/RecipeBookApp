import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
    selector: 'page-store-option',
    templateUrl: 'store-option.html'
})

export class StoreOptionPage {
    constructor(private viewCtrl: ViewController) {

    }

    loadAction(action) {
        if (action) {
            this.viewCtrl.dismiss({
                action: action
            });
        }

        console.log(action);
    }
}
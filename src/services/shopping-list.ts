import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http'
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(
        private http: Http, 
        private authService: AuthService) {

    }

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    getItems() {
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        return this.ingredients.splice(index, 1);
    }

    storeList(token: string) {
        let uid = this.authService.getActiveUser().uid;
        return this.http.put(
            'https://rjayaswal-14c0c.firebaseio.com/' + uid + '/shopping-list.json'
             +'?auth=' + token, this.ingredients)
             .map((response: Response) => response.json());
    }

    loadList(token: string) {
        let uid = this.authService.getActiveUser().uid;
        return this.http.get(
            'https://rjayaswal-14c0c.firebaseio.com/' + uid + '/shopping-list.json'
             +'?auth=' + token)
             .map((response: Response) => response.json())
             .do(
                 (data) => {
                     this.ingredients = data
                 }
             );
    }
}
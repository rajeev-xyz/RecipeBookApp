import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { AuthService } from "./auth";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeService {
    recipes: Recipe[] = [];

    constructor(private authService: AuthService,
        private http: Http) {
    }

    addRecipe(
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    updateRecipe(
        index: number,
        title: string,
        description: string,
        difficulty: string,
        ingredient: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredient);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    storeList(token: string) {
        let uid = this.authService.getActiveUser().uid;
        return this.http.put(
            'https://rjayaswal-14c0c.firebaseio.com/' + uid + '/recipe-list.json'
            + '?auth=' + token, this.recipes)
            .map((response: Response) => response.json());
    }

    loadList(token: string) {
        let uid = this.authService.getActiveUser().uid;
        return this.http.get(
            'https://rjayaswal-14c0c.firebaseio.com/' + uid + '/recipe-list.json'
            + '?auth=' + token)
            .map((response: Response) => response.json())
            .do(
            (data) => {
                this.recipes = data
            }
            );
    }

}
import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

export class RecipeService {
    private recipes: Recipe[] = [];

    addRecipe(
        title: string, 
        description: string, 
        difficulty:string, 
        ingredients: Ingredient[]) {
            this.recipes.push(new Recipe(title,description, difficulty, ingredients));
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    updateRecipe(
        index: number, 
        title: string, 
        description: string, 
        difficulty: string, 
        ingredient: Ingredient[]){
            this.recipes[index] = new Recipe(title, description, difficulty, ingredient);
    }

    getRecipes() {
        return this.recipes.slice();
    }

}
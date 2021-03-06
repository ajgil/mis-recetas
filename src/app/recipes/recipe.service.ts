import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

recipes: Recipe[] = [
    new Recipe(
        'Brocheta Dummy',
        'Receta para dummies',
        'https://upload.wikimedia.org/wikipedia/commons/2/27/Brocheta-frutas-recetas-faciles-ninos.jpg',
        [
            new Ingredient('Frutas variadas', 4),
            new Ingredient('Caramelo', 1)
        ]),
    new Recipe(
        'Burger Dummy',
        'Burguer dummies 2',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Tomato_Sugo_Burger_With_Rocket_Cheese_%28164927095%29.jpeg/800px-Tomato_Sugo_Burger_With_Rocket_Cheese_%28164927095%29.jpeg',
        [
            new Ingredient('pan', 1),
            new Ingredient('queso rocket', 1),
            new Ingredient('tomate', 1),
            new Ingredient('carne de ternera', 1)
        ]),
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
}

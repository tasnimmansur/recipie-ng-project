import { Injectable } from "@angular/core"
import { Subject } from "rxjs/Subject";
import { Recipie } from "./recipie.model"
import { Ingredient } from "../shared/ingredient.model"
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipieService {

  recipiesChanged = new Subject<Recipie[]>();

  private recipies: Recipie[] = [
    new Recipie('First Recipie',
      'This is First Recipie here',
      'http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1-thumb-1500xauto-431710.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipie('Second Recipie',
      'This is Second Recipie here',
      'http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1-thumb-1500xauto-431710.jpg',
      [
        new Ingredient('Burger', 1),
        new Ingredient('Pizza', 20)
      ]),
  ];

  setRecipies(recipies: Recipie[]){
    this.recipies = recipies;
    this.recipiesChanged.next(this.recipies.slice());
  }

  getRecipies() {
    return this.recipies.slice();
  }

  getRecipie(index: number){
    return this.recipies[index];
  }

  constructor(private slService: ShoppingListService){}

  addIngredientsToShoppingList(ingredients: Ingredient[])
  {
    this.slService.addIngredients(ingredients);
  }

  addRecipie(recipie: Recipie){
    this.recipies.push(recipie);
    this.recipiesChanged.next(this.recipies.slice());
  }

  updateRecipie(index: number, newRecipie: Recipie){
    this.recipies[index] = newRecipie;
    this.recipiesChanged.next(this.recipies.slice());
  }

  deleteRecipie(index: number) {
    this.recipies.splice(index, 1);
    this.recipiesChanged.next(this.recipies.slice());
  }
}

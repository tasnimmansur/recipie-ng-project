import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {RecipieService} from "../recipies/recipie.service";
import {Recipie} from "../recipies/recipie.model";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipieService: RecipieService,
              private authservice: AuthService){}

  storeRecipies(){
    const token = this.authservice.getToken();

    return this.http.put('https://recipie-ng-project.firebaseio.com/recipies.json?auth=' + token,
                  this.recipieService.getRecipies());
  }

  getRecipies(){
    const token = this.authservice.getToken();

    this.http.get('https://recipie-ng-project.firebaseio.com/recipies.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipies: Recipie[] = response.json();
          for (let recipie of recipies){
            if(!recipie['ingrediets']){
              console.log(recipie);
              recipie['ingredients'] = [];
            }
          }
          return recipies;
        }
      )
      .subscribe(
        (recipies: Recipie[]) => {
          this.recipieService.setRecipies(recipies);
        }
      );
  }
}

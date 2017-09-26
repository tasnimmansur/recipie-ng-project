import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipieService} from "../recipie.service";

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipieForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipieService: RecipieService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit(){
    console.log(this.recipieForm);
  }

  private initForm(){

    let recipieName = '';
    let recipieImagePath = '';
    let recipieDescription = '';
    let recipieIngredients = new FormArray([]);

    if (this.editMode){
      const recipie = this.recipieService.getRecipie(this.id);
      recipieName = recipie.name;
      recipieImagePath = recipie.imagePath;
      recipieDescription = recipie.description;

      if(recipie['ingredients']){
        for(let ingredient of recipie.ingredients){
          recipieIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipieForm = new FormGroup({
      'name': new FormControl(recipieName),
      'imagePath': new FormControl(recipieImagePath),
      'description': new FormControl(recipieDescription),
      'ingredients': recipieIngredients
    });
  }

}

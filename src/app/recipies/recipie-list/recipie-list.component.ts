import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Recipie } from '../recipie.model'
import {RecipieService} from "../recipie.service";


@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[];

  constructor(private recipieService: RecipieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipies = this.recipieService.getRecipies();
  }

  onNewRecipie() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}

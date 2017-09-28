import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipie';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA1wXM4poC615bNuhF2wlhiQDNFqis_Bf8",
      authDomain: "recipie-ng-project.firebaseapp.com",
    });
  }

  onNavigate(feature :string) {
      this.loadedFeature = feature;
  }
}

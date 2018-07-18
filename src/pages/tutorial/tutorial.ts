import {Component} from '@angular/core';
import {NavController, Platform} from "ionic-angular";

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  constructor(public platform: Platform, public navCtrl: NavController) {
    this.platform.ready().then((readySource) => {

    });
  }
}

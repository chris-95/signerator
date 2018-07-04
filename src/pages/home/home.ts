import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

import paper from 'paper';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, gyro: Gyroscope) {}

  ngAfterViewInit() {
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
    myCanvas.width = window.innerWidth - 48;
    myCanvas.height = window.innerHeight * .7;

    // Create an empty project and a view for the canvas:
    paper.setup(myCanvas);

    let letters = paper.project.importSVG(document.getElementById('svg'));
    letters.visible = true;
    let firstLetter = letters.children.firstLetter;
    let secondLetter = letters.children.secondLetter;
    firstLetter.position = [52, 70];
    //console.log(firstLetter.children[0].intersects(secondLetter.children[0]));

    let generateSign = function () {

      paper.project.activeLayer.removeChildren();

      let color1 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
      let color2 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";

      let alpha1 = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
      let alpha2 = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

      let x1 = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;
      let y1 = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;

      let x2 = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;
      let y2 = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;

      let firstLetter = new paper.PointText(new paper.Point(x1, y1));
      firstLetter.fillColor = color1;
      firstLetter.content = 'J';
      firstLetter.rotate(alpha1);
      firstLetter.fontSize = '48px';

      let secondLetter = new paper.PointText(new paper.Point(x2, y2));
      secondLetter.fillColor = color2;
      secondLetter.content = 'B';
      secondLetter.rotate(alpha2);
      secondLetter.fontSize = '48px';
      secondLetter.skew(10, 20);

      paper.view.draw();
    };

    let newButton = document.getElementById("neu");
    newButton.onclick = generateSign;

    /*let generateGyroData = function() {

      let options: GyroscopeOptions = {
        frequency: 1000
      };

      gyro.getCurrent(options).then((orientation: GyroscopeOrientation) => {
        console.log("OrientationStart: " + orientation.x, orientation.y, orientation.z);
      })
      .catch((e) => console.log(e));

      gyro.watch().subscribe((orientation: GyroscopeOrientation) => {
        console.log("OrientationChanged: " + orientation.x, orientation.y, orientation.z);
      });

    }*/

    //let gyroButton = document.getElementById("gyro");
    //gyroButton.onclick = generateGyroData;
  }
}

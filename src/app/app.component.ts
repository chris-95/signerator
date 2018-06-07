import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

import paper from 'paper';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, gyro: Gyroscope) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //OUR CODE BELONGS HERE
      let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
      myCanvas.width = window.innerWidth - 48;
      myCanvas.height = window.innerHeight * .7;
      //let ctx = myCanvas.getContext("2d");
      //ctx.font = "200px Roboto"

		// Create an empty project and a view for the canvas:
    paper.setup(myCanvas);

      let generateSign = function () {

        paper.project.activeLayer.removeChildren();

        let color1 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
        let color2 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";

        let alpha1 = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
        let alpha2 = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

        let x1 = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;;
        let y1 = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;

        let x2 = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;;
        let y2 = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;;

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
        secondLetter.skew(10,20);

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
    });
  }
}


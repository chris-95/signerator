import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //OUR CODE BELONGS HERE
      let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
      let ctx = myCanvas.getContext("2d");
      ctx.font = "200px Roboto"

      let generateSign = function () {
        console.log("test");
        //Use the identity Matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

        //Restore the transform
        ctx.restore();

        let x1 = -100 + Math.random() * 100;
        let y1 = -100 + Math.random() * 100;

        let x2 = -100 + Math.random() * 100;
        let y2 = -100 + Math.random() * 100;

        let alpha1 = (Math.random() * 360) * Math.PI / 180;
        let alpha2 = (Math.random() * 360) * Math.PI / 180;

        let color1 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
        let color2 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";

        ctx.translate(250, 250);
        ctx.rotate(alpha1);

        ctx.fillStyle = color1;
        ctx.fillText("J", x1, y1);

        ctx.restore();

        ctx.rotate(alpha2);

        ctx.fillStyle = color2;
        ctx.fillText("B", x2, y2);

        ctx.translate(0, 0);

        ctx.restore();
      };

      let newButton = document.getElementById("neu");
      newButton.onclick = generateSign;
    });
  }
}


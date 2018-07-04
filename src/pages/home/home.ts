import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import shortId from 'shortid';

import paper from 'paper';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Screenshot } from '@ionic-native/screenshot';
import {async} from "@angular/core/testing";

const WHITE = '#ffffff';
const BLACK = '#000000';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  sign: any;

  // myCanvas: node = document.getElementById("myCanvas");

  constructor(public navCtrl: NavController, gyro: Gyroscope, private screenshot: Screenshot, public navParams: NavParams) {
    this.sign = this.navParams.get('svg');
  }

  background: string = WHITE;
  fontColor1: string = BLACK;
  fontColor2: string = BLACK;

  invertColors() {
   this.background = (this.background === BLACK) ? WHITE : BLACK;
   this.fontColor1 = (this.fontColor1 === BLACK) ? WHITE : BLACK; //TODO calculate inverted colors
    this.fontColor2 = (this.fontColor2 === BLACK) ? WHITE : BLACK;
   this.update();
  }

  colorize() {
    this.fontColor1 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
    this.fontColor2 = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
    // console.log(colorize);
  }

  saveScreenShot() {
    const imageMask = document.getElementById("imageMask");
    const imageBackground = document.getElementsByClassName("canvas-container")[0];
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");

    // Set imageMask width/height to fit current canvas
    imageMask.style.width = myCanvas.style.width;
    imageMask.style.width = myCanvas.style.height;

    // Get Canvas then extract a base46 image

    if(imageMask != null) {
      imageMask.src = myCanvas.toDataURL("image/jpeg", 0.5);
    }

    // Set imageMask width/height to fit current canvas
    //imageBackground.style.width = myCanvas.style.width;
    //imageBackground.style.width = myCanvas.style.height;
    //imageBackground.style.background = BLACK; // TODO use current property

    // Hide canvas and show image mask instead and after taking the screenshot, hide mask and show canvas again
    // myCanvas.style.visibility = 'hidden';
    imageMask.style.display = 'block';

    this.screenshot.save('jpg', 80, shortId.generate()+'.jpg');

    // myCanvas.style.visibility = 'visible';
    // imageMask.style.display = 'none';
  }

  update() {
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
    myCanvas.style.background = this.background;
  }

  ngAfterViewInit() {
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
    myCanvas.width = window.innerWidth - 48;
    myCanvas.height = window.innerHeight * .7;
    myCanvas.style.background = this.background;


    // Create an empty project and a view for the canvas:
    paper.setup(myCanvas);

    console.log(this.sign);
    if(this.sign !== undefined) {
      document.getElementById('svg').innerHTML = this.sign;
    }

    let letters = paper.project.importSVG(document.getElementById('svg'));
    letters.visible = true;
    let firstLetter = letters.children.firstLetter;
    let secondLetter = letters.children.secondLetter;
    firstLetter.position = [52, 300];
    //console.log(firstLetter.children[0].intersects(secondLetter.children[0]));

    let generateSign = function () {

      paper.project.activeLayer.removeChildren();

      let alpha1 = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
      let alpha2 = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

      let x1 = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;
      let y1 = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;

      let x2 = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;
      let y2 = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;



      let firstLetter = new paper.PointText(new paper.Point(x1, y1));
      firstLetter.fillColor = this.fontColor1;
      firstLetter.content = 'J';
      firstLetter.rotate(alpha1);
      firstLetter.fontSize = '100px';

      let secondLetter = new paper.PointText(new paper.Point(x2, y2));
      secondLetter.fillColor = this.fontColor2;
      secondLetter.content = 'B';
      secondLetter.rotate(alpha2);
      secondLetter.fontSize = '100px';

      paper.view.draw();

    };

    let newButton = document.getElementById("neu");

    generateSign = generateSign.bind(this);
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

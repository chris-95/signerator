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
  background: string = WHITE;

  firstLetterSign: object = {
    alpha: 0,
    x: 0,
    y: 0,
    color: BLACK
  };

  secondLetterSign: object = {
    alpha: 0,
    x: 0,
    y: 0,
    color: BLACK
  };

  // myCanvas: node = document.getElementById("myCanvas");

  constructor(public navCtrl: NavController, gyro: Gyroscope, private screenshot: Screenshot, public navParams: NavParams) {
    this.sign = this.navParams.get('svg');
    this.calcSign = this.calcSign.bind(this);
    this.drawSign = this.drawSign.bind(this);
    this.generateSign = this.generateSign.bind(this);
  }

  // calculate initial transformation of letters
  ngOnInit() {
    this.calcSign();
  }

  // signerate logo with button // TODO use gyroscope
  generateSign() {
    this.calcSign();
    this.drawSign();
  };

  // invert colors with shortcut button on homescreen
  invertColors() {
   this.background = (this.background === BLACK) ? WHITE : BLACK;
   this.firstLetterSign.color = (this.background === BLACK) ? WHITE : BLACK;
    this.secondLetterSign.color = (this.background === BLACK) ? WHITE : BLACK;
   this.drawSign();
  }

  // random coloration of letters
  colorize() {
    this.firstLetterSign.color = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
    this.secondLetterSign.color = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
    this.drawSign();
  }

  // TODO FIXME :D
  saveScreenShot() {
    const imageMask = document.getElementById("imageMask");
    const imageBackground = document.getElementsByClassName("canvas-container")[0];
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");

    // Set imageMask width/height to fit current canvas
    imageMask.style.width = myCanvas.style.width;
    imageMask.style.width = myCanvas.style.height;

    // Get Canvas then extract a base46 image

    if(!!imageMask) {
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

  // calculate translation and rotation of letters
  calcSign() {
    this.firstLetterSign.alpha = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
    this.secondLetterSign.alpha = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

    this.firstLetterSign.x = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;
    this.firstLetterSign.y = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;

    this.secondLetterSign.x = Math.floor(Math.random() * (myCanvas.width - 0 + 1)) + 0;
    this.secondLetterSign.y = Math.floor(Math.random() * (myCanvas.height - 0 + 1)) + 0;
  }

  // draw with paper js on canvas
  drawSign() {
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
    myCanvas.style.background = this.background;

    paper.project.activeLayer.removeChildren();

    let firstLetter = new paper.PointText(new paper.Point(this.firstLetterSign.x,       this.firstLetterSign.y));
    firstLetter.fillColor = this.firstLetterSign.color;
    firstLetter.content = 'J';
    firstLetter.rotate(this.firstLetterSign.alpha);
    firstLetter.fontSize = '100px';

    let secondLetter = new paper.PointText(new paper.Point(this.secondLetterSign.x,       this.secondLetterSign.y));
    secondLetter.fillColor = this.secondLetterSign.color;
    secondLetter.content = 'B';
    secondLetter.rotate(this.secondLetterSign.alpha);
    secondLetter.fontSize = '100px';

    paper.view.draw();
  }

  // canvas & paper setup
  ngAfterViewInit() {
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
    myCanvas.width = window.innerWidth - 48;
    myCanvas.height = window.innerHeight * .7;
    myCanvas.style.background = this.background;

    // Create an empty project and a view for the canvas:
    paper.setup(myCanvas);

    if(this.sign !== undefined) {
      document.getElementById('svg').innerHTML = this.sign;
    }

    let letters = paper.project.importSVG(document.getElementById('svg'));
    letters.visible = true;
    let firstLetter = letters.children.firstLetter;
    let secondLetter = letters.children.secondLetter;
    firstLetter.position = [52, 300];
    // console.log(firstLetter.children[0].intersects(secondLetter.children[0]));
  }
}

import {Component, Renderer, ViewChild} from '@angular/core';
import { NavController, NavParams, Events, Platform } from 'ionic-angular';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Toast } from '@ionic-native/toast';

import paper from 'paper';


const WHITE = '#ffffff';
const BLACK = '#000000';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  @ViewChild('myCanvas') canvas: any;

  canvasElement: any;

  sign: any;
  background: string = WHITE;
  backgroundRect: any;
  letters: any;
  firstLetter: any;
  secondLetter: any;

  canvasWidth: any;
  canvasHeight: any;

  firstLetterSign: any = {
    alpha: 0,
    x: 0,
    y: 0,
    color: BLACK
  };

  secondLetterSign: any = {
    alpha: 0,
    x: 0,
    y: 0,
    color: BLACK
  };

  // myCanvas: node = document.getElementById("myCanvas");

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private toast: Toast,
    private base64ToGallery: Base64ToGallery,
    public navParams: NavParams,
    public gyro: Gyroscope,
    public events: Events,
    public renderer: Renderer
  ) {
    this.sign = this.navParams.get('svg');
    this.calcSign = this.calcSign.bind(this);
    this.drawSign = this.drawSign.bind(this);
    this.generateSign = this.generateSign.bind(this);
    this.canvasWidth = window.innerWidth - 32;
    this.canvasHeight = window.innerHeight * 0.7;

    events.subscribe('functionCall:gyroscopeDetection', (text) => {
      console.log('TEXT: '+text);
      this.generateSign();
    });

    this.platform.ready().then((readySource) => {
      if(readySource === 'cordova') {
        let options: GyroscopeOptions = {
          frequency: 1000
        };

        this.gyro.getCurrent(options).then((orientation: GyroscopeOrientation) => {
          console.log("OrientationStart: " + orientation.x, orientation.y, orientation.z);
        })
          .catch((e) => console.log(e));

        this.gyro.watch(options).subscribe((orientation: GyroscopeOrientation) => {
          console.log("OrientationChanged: " + orientation.x, orientation.y, orientation.z);
          let gyroDetect = (orientation.x > 2 || orientation.x < -2 ||
            orientation.y > 2 || orientation.y < -2 ||
            orientation.z > 2 || orientation.z < -2);
          console.log('DETECT: '+gyroDetect);
          if(gyroDetect) {
            console.log('CHANGETOHOME');
          }
        });
      }
    });
  }

  // calculate initial transformation of letters
  ngOnInit() {
    this.calcSign();
  }

  // signerate logo with button // TODO use gyroscope
  generateSign() {
    this.calcSign();

    this.firstLetter.position = [this.firstLetterSign.x, this.firstLetterSign.y];
    this.firstLetter.rotation = this.firstLetterSign.alpha;
    this.firstLetter.fillColor = this.firstLetterSign.color;
    this.firstLetter.strokeColor = this.firstLetterSign.color;
    this.secondLetter.position = [this.secondLetterSign.x, this.secondLetterSign.y];
    this.secondLetter.rotation = this.secondLetterSign.alpha;
    this.secondLetter.fillColor = this.secondLetterSign.color;
    this.secondLetter.strokeColor = this.secondLetterSign.color;

    this.drawSign();
  };

  // invert colors with shortcut button on homescreen
  invertColors() {
   this.background = (this.background === BLACK) ? WHITE : BLACK;
   this.firstLetterSign.color = (this.background === BLACK) ? WHITE : BLACK;
    this.secondLetterSign.color = (this.background === BLACK) ? WHITE : BLACK;
    this.firstLetter.fillColor = this.firstLetterSign.color;
    this.firstLetter.strokeColor = this.firstLetterSign.color;
    this.secondLetter.fillColor = this.secondLetterSign.color;
    this.secondLetter.strokeColor = this.secondLetterSign.color;
   this.drawSign();
  }

  // random coloration of letters
  colorize() {
    this.firstLetterSign.color = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
    this.secondLetterSign.color = "rgba(" + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + "," + (Math.random() > 0.5 ? 255 : 0) + ", 0.5)";
    this.firstLetter.fillColor = this.firstLetterSign.color;
    this.firstLetter.strokeColor = this.firstLetterSign.color;
    this.secondLetter.fillColor = this.secondLetterSign.color;
    this.secondLetter.strokeColor = this.secondLetterSign.color;

    this.drawSign();
  }

  //save generated image to gallery
  saveScreenShot() {
    let myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");

    this.base64ToGallery.base64ToGallery(myCanvas.toDataURL(), { prefix: '_img', mediaScanner: true }).then(
      res =>  this.toast.show(`Bild gespeichert`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        ),
      err => this.toast.show(`Bild konnte nicht gespeichert werden`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      )
    );
  }

  // calculate translation and rotation of letters
  calcSign() {
    this.firstLetterSign.alpha = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
    this.secondLetterSign.alpha = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

    this.firstLetterSign.x = Math.floor(Math.random() * ((this.canvasWidth - 100) - 100 + 1)) + 100;
    this.firstLetterSign.y = Math.floor(Math.random() * ((this.canvasHeight - 100) - 100 + 1)) + 100;

    this.secondLetterSign.x = Math.floor(Math.random() * ((this.canvasWidth - 100) - 100 + 1)) + 100;
    this.secondLetterSign.y = Math.floor(Math.random() * ((this.canvasHeight - 100) - 100 + 1)) + 100;
  }

  // draw with paper js on canvas
  drawSign() {
    this.backgroundRect.fillColor = this.background;

    if(this.firstLetter.children[0].getIntersections(this.secondLetter.children[0]).length < 2)
      this.generateSign();

    paper.view.draw();
  }

  // canvas & paper setup
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.canvasWidth);
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.canvasHeight);
    this.renderer.setElementAttribute(this.canvasElement, 'style', 'background: '+this.background);

    paper.setup(this.canvasElement);

    if(this.sign !== undefined) {
      document.getElementById('svg').innerHTML = this.sign;
    }

    this.backgroundRect = new paper.Path.Rectangle({
      point: [0, 0],
      size: [paper.view.size.width, paper.view.size.height],
    });

    this.backgroundRect.sendToBack();
    this.backgroundRect.fillColor = this.background;

    this.letters = paper.project.importSVG(document.getElementById('svg'));
    this.letters.visible = true;
    this.firstLetter = this.letters.children.firstLetter;
    this.secondLetter = this.letters.children.secondLetter;
    this.generateSign();
  }
}

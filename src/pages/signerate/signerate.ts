import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController, Platform} from "ionic-angular";
import { HomePage } from '../home/home';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

import makerjs from 'makerjs';
declare var opentype: any;

@Component({
  selector: 'page-signerate',
  templateUrl: 'signerate.html'
})
export class SigneratePage {
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;
 /* 'Standard': {
    'regular': 'http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Me5Q.ttf',
    'light': 'http://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5vAw.ttf',
    'bold': 'http://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9vAw.ttf'*/
  fonts: any = [
    {
      'id': 0,
      'name': 'Standard',
      'info': 'Wirkt sachlich-nüchtern und zeitlos. Ist sehr gut lesbar.',
      'styles': [
        {
          'id': 0,
          'type': 'light',
          'info': 'Dünne und filigranere Schriftstärke. Wirkt etwas sanfter.',
          'url': 'http://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5vAw.ttf'
        },
        {
          'id': 1,
          'type': 'regular',
          'info': 'Normale Schriftstärke. Keine Besonderheit.',
          'url': 'http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Me5Q.ttf'
        },
        {
          'id': 2,
          'type': 'bold',
          'info': 'Dicke Schriftstärke. Wirkt noch masiver auf den Betrachter',
          'url': 'http://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9vAw.ttf'
        }
      ]
    },
    {
      'id': 1,
      'name': 'Serif',
      'info': 'Wirkt elegant und konservativ. Sehr gute Lesbarkeit beim Printmedium.',
      'styles': [
        {
          'id': 0,
          'type': 'light',
          'info': 'Leider keine Schrift vorhanden',
          'url': ''
        },
        {
          'id': 1,
          'type': 'regular',
          'info': 'Normale Schriftstärke. Keine Beosnderheit.',
          'url': 'http://fonts.gstatic.com/s/alegreya/v10/4UaBrEBBsBhlBjvfkRLm.ttf'
        },
        {
          'id': 2,
          'type': 'bold',
          'info': 'Dicke Schriftstärke. Wirkt noch masiver auf den Betrachter.',
          'url': 'http://fonts.gstatic.com/s/alegreya/v10/4UaGrEBBsBhlBjvfkSoS5I3J.ttf'
        }
      ]
    },
    {
      'id': 2,
      'name': 'Handschrift',
      'info': 'Signalisiert Individualität, Persönlichkeit und Dynamik. Gut als Blickfang einsetzbar',
      'styles': [
        {
          'id': 0,
          'type': 'light',
          'info': 'Leider keine Schrift vorhanden',
          'url': ''
        },
        {
          'id': 1,
          'type': 'regular',
          'info': 'Normale Schriftstärke. Keine Besonderheit.',
          'url': 'http://fonts.gstatic.com/s/grandhotel/v5/7Au7p_IgjDKdCRWuR1azpmQN.ttf'
        },
        {
          'id': 2,
          'type': 'bold',
          'info': 'Leider keine Schrift vorhanden',
          'url': ''
        }
      ]
    }
  ];

  submitAttempt: boolean = false;
  showPreview: boolean;

  constructor(public platform: Platform, public navCtrl: NavController, public formBuilder: FormBuilder, public gyro: Gyroscope, public alertController: AlertController) {
    let that = this;
    this.slideOneForm = formBuilder.group({
      firstLetter: ['', Validators.compose([Validators.maxLength(1), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      secondLetter: ['', Validators.compose([Validators.maxLength(1), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });

    this.slideTwoForm = formBuilder.group({
      font: ['', Validators.required]
    });

    this.slideThreeForm = formBuilder.group( {
      url: ['', Validators.required]
    });


    this.platform.ready().then((readySource) => {
      this.signupSlider.onlyExternal = true;
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
              console.log('PREVIEW: '+that.showPreview);
            if(that.showPreview && gyroDetect) {
              console.log('CHANGETOHOME');
              that.navCtrl.setRoot(HomePage, {svg: document.getElementById('previewSvg').innerHTML});
              that.showPreview = false;
            }
          });
      }
    });
  }

  onSlideChange() {
    document.getElementById('renderDiv').innerHTML = '';
    this.showPreview = (this.slideOneForm.valid && this.slideTwoForm.valid && this.slideThreeForm.valid);
    if(this.showPreview) {
      this.render(this.slideThreeForm.value.url,
        this.slideOneForm.value.firstLetter,
        128,
        true,
        false,
        undefined);
      this.render(this.slideThreeForm.value.url,
        this.slideOneForm.value.secondLetter,
        128,
        true,
        false,
        undefined);
    }
  }

  next(){
    this.signupSlider.slideNext();
  }

  prev(){
    this.signupSlider.slidePrev();
  }

  openModal(title, info) {
    let alert = this.alertController.create({
      title: title,
      subTitle: info,
      buttons: ['Ok']
    });
    alert.present();
  }

  save(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.signupSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
    }
    else if(!this.slideThreeForm.valid){
      this.signupSlider.slideTo(2);
    }
    else {
      console.log("success!")
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
      console.log(this.slideThreeForm.value);
      this.navCtrl.setRoot(HomePage, {svg: document.getElementById('previewSvg').innerHTML});
      this.showPreview = false;
    }
  }

  render(url, text, size, union, separate, bezierAccuracy) {
    opentype.load(url, function (err, font) {
      //generate the text using a font
      let textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy);
      if (separate) {
        for (let i in textModel.models) {
          textModel.models[i].layer = i;
        }
      }

      let options = {svgAttrs: {id: 'previewSvg', height: 150, width: 300}};

      let svg = makerjs.exporter.toSVG(textModel, options);

      if(document.getElementById('renderDiv').innerHTML !== '') {
        svg = svg.replace('svgGroup', 'secondLetter');
        let gPosition = svg.indexOf('<g');
        svg = svg.substring(gPosition, svg.length - 6);
        document.getElementById('previewSvg').innerHTML += svg;
        document.getElementById('previewSvg').removeAttribute('viewBox');
        document.getElementById('secondLetter').setAttribute('transform', 'translate(175,10)');
        document.getElementById('firstLetter').setAttribute('transform', 'translate(100,10)');
        document.getElementsByTagName('g')[0].removeAttribute('fill');
        document.getElementsByTagName('g')[0].style.fill = '#000';
        document.getElementsByTagName('g')[1].removeAttribute('fill');
        document.getElementsByTagName('g')[1].style.fill = '#000';
      } else {
        svg = svg.replace('svgGroup', 'firstLetter');
        document.getElementById('renderDiv').innerHTML = svg;
      }

    });
  }
}

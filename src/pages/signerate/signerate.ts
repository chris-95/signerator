import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavController} from "ionic-angular";

import makerjs from 'makerjs';
let opentype = require('opentype.js');
import paper from 'paper';

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
      'styles': [
        {
          'id': 0,
          'type': 'light',
          'url': 'http://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5vAw.ttf'
        },
        {
          'id': 1,
          'type': 'regular',
          'url': 'http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Me5Q.ttf'
        },
        {
          'id': 2,
          'type': 'bold',
          'url': 'http://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9vAw.ttf'
        }
      ]
    },
    {
      'id': 1,
      'name': 'Serif',
      'styles': [
        {
          'id': 0,
          'type': 'light',
          'url': ''
        },
        {
          'id': 1,
          'type': 'regular',
          'url': 'http://fonts.gstatic.com/s/alegreya/v10/4UaBrEBBsBhlBjvfkRLm.ttf'
        },
        {
          'id': 2,
          'type': 'bold',
          'url': 'http://fonts.gstatic.com/s/alegreya/v10/4UaGrEBBsBhlBjvfkSoS5I3J.ttf'
        }
      ]
    }
  ];

  submitAttempt: boolean = false;
  showPreview: boolean;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
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

  save(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.signupSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
    }
    else {
      console.log("success!")
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
      console.log(this.slideThreeForm.value);
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

      let options = {svgAttrs: {id: 'previewSvg', width: 300}};

      let svg = makerjs.exporter.toSVG(textModel, options);

      if(document.getElementById('renderDiv').innerHTML !== '') {
        svg = svg.replace('svgGroup', 'secondLetter');
        let gPosition = svg.indexOf('<g');
        svg = svg.substring(gPosition, svg.length - 6);
        document.getElementById('previewSvg').innerHTML += svg;
        document.getElementById('secondLetter').setAttribute('transform', 'translate(100,0)')
      } else {
        svg = svg.replace('svgGroup', 'firstLetter');
        document.getElementById('renderDiv').innerHTML = svg;
      }

    });
  }
}

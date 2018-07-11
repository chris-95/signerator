import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

import { HomePage } from '../pages/home/home';
import { SigneratePage } from "../pages/signerate/signerate";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public gyro: Gyroscope, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Signerate', component: SigneratePage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

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
            console.log("INIT OrientationChanged: " + orientation.x, orientation.y, orientation.z);
            let gyroDetect = (orientation.x > 2 || orientation.x < -2 ||
              orientation.y > 2 || orientation.y < -2 ||
              orientation.z > 2 || orientation.z < -2);
              console.log('DETECT: '+gyroDetect);
            if(gyroDetect) {
              console.log('INIT CHANGETOHOME');
              this.events.publish('functionCall:gyroscopeDetection', 'GenerateSign');
            }
          });
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


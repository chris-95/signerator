import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Gyroscope } from '@ionic-native/gyroscope';
import { Screenshot } from '@ionic-native/screenshot';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigneratePage } from "../pages/signerate/signerate";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigneratePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigneratePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Gyroscope,
    Screenshot,
    Base64ToGallery,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

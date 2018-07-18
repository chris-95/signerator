import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Gyroscope } from '@ionic-native/gyroscope';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigneratePage } from "../pages/signerate/signerate";
import { TutorialPage } from '../pages/tutorial/tutorial';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigneratePage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigneratePage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Gyroscope,
    Base64ToGallery,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

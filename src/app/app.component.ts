import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

import firebase from 'firebase';
import { AuthService } from '../services/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signInPage: any = SigninPage;
  signUpPage: any = SignupPage;
  @ViewChild('nav') nav: NavController;
  isLoggedIn: boolean = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authSerivce: AuthService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Initialize Firebase
      firebase.initializeApp({
        apiKey: "AIzaSyAhm1xEuulbaLxolPsNxgxwxZYxCnfNKik",
        authDomain: "rjayaswal-14c0c.firebaseapp.com",
        databaseURL: "https://rjayaswal-14c0c.firebaseio.com"
      });

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLoggedIn = true;
          this.rootPage = TabsPage;
        } else {
          this.isLoggedIn = false;
          this.rootPage = SigninPage;
        }
      });
    });
  }

  openPage(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  signOut() {
    this.authSerivce.signout();
    this.menuCtrl.close();
  }

}


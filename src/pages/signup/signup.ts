import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    private authService: AuthService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController){

  }

  onSignUp(form: NgForm){
    const loader = this.loadingCtrl.create({
      content: 'Please wait...!!'
    });
    
    loader.present();
    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
    loader.dismiss();

    console.log(data);
    })
    .catch(error => {
      loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'SignUp Failed',
        message: error.message,
        buttons: ['Ok'] 
      });
      console.log(error);
      alert.present();
     
    });
  }
}
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthService } from '../../services/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController) {

  }

  onSignIn(form: NgForm) {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...!!'
    });

    loader.present();
    this.authService.singin(form.value.email, form.value.password)
      .then(data => {
        loader.dismiss();

        console.log(data);
      })
      .catch(error => {
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'SignIn Failed',
          message: error.message,
          buttons: ['Ok']
        });
        console.log(error);
        alert.present();

      });
  }
}

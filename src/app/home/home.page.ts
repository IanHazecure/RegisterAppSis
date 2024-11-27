import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: string = '';
  password: string = '';

  constructor(private router: Router, public navCtrl: NavController ) {}

  login() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (this.usuario === storedUser.username && this.password === storedUser.password) {
      const userType = storedUser.userType;
      if (userType === 'Docente') {
        this.router.navigate(['/principal'], { queryParams: { nombre: this.usuario } });
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('/principal');
      } else if (userType === 'Alumno') {
        this.router.navigate(['/alumnos'], { queryParams: { nombre: this.usuario } });
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('/alumnos');
      } else {
        console.log('User type not recognized.');
      }
    } else {
      console.log('Invalido');
    }
  }

  goToRecuperar() {
    console.log('click');
    this.router.navigate(['/recuperar']);
  }

  goToRegister() {
    console.log('click');
    this.router.navigate(['/register']);
  }
  
}


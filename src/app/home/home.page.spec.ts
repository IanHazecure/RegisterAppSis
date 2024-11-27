import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular'; // AlertController
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private http: HttpClient, // HttpClient
    private alertController: AlertController // AlertController
  ) {}

  login() {
    const url = 'https://www.presenteprofe.cl/api/v1/auth'; // URL API

    const body = {
      correo: this.usuario,
      password: this.password,
    };

    this.http.post(url, body).subscribe(
      (response: any) => {
        console.log('Login exitoso', response);

     
        const userType = response.userType; 
        if (userType === 'Docente') {
          this.router.navigate(['/principal'], { queryParams: { nombre: this.usuario } });
          localStorage.setItem('ingresado', 'true');
          this.navCtrl.navigateRoot('/principal');
        } else if (userType === 'Alumno') {
          this.router.navigate(['/alumnos'], { queryParams: { nombre: this.usuario } });
          localStorage.setItem('ingresado', 'true');
          this.navCtrl.navigateRoot('/alumnos');
        } else {
          console.log('Tipo de usuario no reconocido.');
        }
      },
      async (error) => {
        console.error('Error en el login', error);

        // error
        await this.mostrarAlerta();
      }
    );
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Correo o contraseña incorrecto.',
      buttons: ['Aceptar'],
    });

    await alert.present();
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
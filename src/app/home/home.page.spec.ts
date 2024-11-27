import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular'; // Importar AlertController
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  password: string = '';
  userType: string = ''; // Variable para almacenar el tipo de usuario

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private http: HttpClient, // Inyecta HttpClient
    private alertController: AlertController // Inyecta AlertController
  ) {}

  login() {
    const url = 'https://www.presenteprofe.cl/api/v1/auth'; // URL para el login

    const body = {
      correo: this.usuario,
      password: this.password,
    };

    this.http.post(url, body).subscribe(
      (response: any) => {
        console.log('Login exitoso', response);

        // Después del login, llamamos al endpoint /auth/me para obtener la información del usuario
        this.obtenerInformacionUsuario();
      },
      async (error) => {
        console.error('Error en el login', error);

        // Mostrar alerta de error
        await this.mostrarAlerta();
      }
    );
  }

  obtenerInformacionUsuario() {
    const url = `https://www.presenteprofe.cl/api/v1/auth/me?user=${this.usuario}`; // URL del nuevo endpoint

    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Información del usuario obtenida', response);

        // Extraer el perfil del usuario y asignarlo a userType
        this.userType = response.data.perfil;

        // Navegar según el tipo de usuario
        if (this.userType === 'Docente') {
          this.router.navigate(['/principal'], { queryParams: { nombre: this.usuario } });
          localStorage.setItem('ingresado', 'true');
          this.navCtrl.navigateRoot('/principal');
        } else if (this.userType === 'Alumno') {
          this.router.navigate(['/alumnos'], { queryParams: { nombre: this.usuario } });
          localStorage.setItem('ingresado', 'true');
          this.navCtrl.navigateRoot('/alumnos');
        } else {
          console.log('Tipo de usuario no reconocido.');
        }
      },
      (error) => {
        console.error('Error al obtener información del usuario', error);
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
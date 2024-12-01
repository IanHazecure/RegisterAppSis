import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';     
  password: string = '';    
  errorMessage: string = ''; 

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  
  validateInputs() {
    if (!this.usuario || !this.password) {
    
      this.errorMessage = 'Tienes que ingresa tu usuario y contraseña.';
    } else {
      
      this.errorMessage = '';   
      this.login();  
    }
  }

  // Método para autenticar y navegar al dashboard
  login() {
    const credentials = {
      correo: this.usuario,  
      password: this.password,
    };

    // Llamar al servicio de autenticación
    this.authService.authenticate(credentials).subscribe(
      async (response) => {
        console.log('Respuesta de autenticación:', response);

        // Guarda el token en el almacenamiento si la autenticación es exitosa
        await this.authService.saveToken(response.auth.token);



        // Obtén el perfil del usuario desde la respuesta
      const perfil = response.perfil;
      const username = response.data.nombre_completo || 'Invitado';

        // Navegar según el perfil del usuario
      if (perfil === 'estudiante') {
        // Navegar a la vista para estudiantes
        this.navCtrl.navigateForward(['/dashboard', { usuario: username }]);
      } else if (perfil === 'docente') {
        // Navegar a la vista para profesores
        this.navCtrl.navigateForward(['/dashboard-profe', { usuario: username }]);
      } else {
        // Manejar otros perfiles o redirigir a una vista genérica
        this.navCtrl.navigateForward(['/dashboard', { usuario: username }]);
      }
    },
    (error) => {
      console.error('Error de autenticación:', error);
      // Muestra un mensaje de error si la autenticación falla
      this.errorMessage = 'Usuario o contraseña incorrecta.';
    }
    );
  }
}

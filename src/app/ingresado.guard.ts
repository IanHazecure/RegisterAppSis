import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { inject } from '@angular/core';

export const ingresadoGuard: CanActivateFn = (route, state) => {
  const navCtrl = inject(NavController);
  const isIngresado = localStorage.getItem('ingresado') === 'true';
  const userType = localStorage.getItem('usertype');
  const restrictedRoutes = ['/home', '/register', '/recuperar'];
  if (isIngresado) {
    if (restrictedRoutes.includes(state.url)) {
      if (userType === 'Docente') {
        navCtrl.navigateRoot('/principal');
      } else if (userType === 'Alumno') {
        navCtrl.navigateRoot('/alumnos');
      }
      return false;
    }
    return true;
  } else {
    return true;
  }
};
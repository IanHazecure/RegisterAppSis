import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosPage } from './alumnos.page';
import { AuthGuard } from '../guards/auth.guard'; // Asegúrate de que la ruta sea correcta

const routes: Routes = [
  {
    path: '',
    component: AlumnosPage,
    canActivate: [AuthGuard], // Aplica el guard aquí
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosPageRoutingModule {}

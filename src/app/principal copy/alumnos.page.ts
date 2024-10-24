import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class PrincipalPage implements OnInit {
  username: string = "";
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeData: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
  }

  

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('ingresado');
    this.router.navigate(['/']); 
  }
}

export class AlumnosPage {


}

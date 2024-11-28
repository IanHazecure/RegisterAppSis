import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  username: string = "";
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeVisible: boolean = false;
  programacionButtonVisible: boolean = false;
  userData: any = {};
  curso: any = {
    nombre: '',
    sigla: '',
    institucion: '',
    descripcion: ''
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient // Inyectar HttpClient
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', this.curso);
      this.postCurso(this.curso);
    }
  }

  postCurso(curso: any) {
    const url = 'https://www.presenteprofe.cl/api/v1/cursos'; // URL endpoint
    this.http.post(url, curso).pipe(
      catchError((error) => {
        console.error('Error al enviar el curso:', error);
        return of(null); // Devuelv un valor vacioo para evitar que falle el observable
      })
    ).subscribe((response) => {
      if (response) {
        console.log('Respuesta de la API:', response);
      } else {
        console.log('No se pudo enviar el curso.');
      }
    });
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('ingresado');
    this.router.navigate(['/']); 
  }

  showProgramacionButton() {
    this.programacionButtonVisible = !this.programacionButtonVisible;

    if (this.qrCodeVisible) {
      this.qrCodeVisible = false;
    }
  }

  showQRCode() {
    this.qrCodeVisible = !this.qrCodeVisible;
  }
}
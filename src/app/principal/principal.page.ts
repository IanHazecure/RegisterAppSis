import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient and HttpHeaders
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
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
    private authService: AuthService,
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient // Inyectar HttpClient
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  async onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', this.curso);
      
      // Obtén el token antes de enviar la solicitud
      const token = await this.authService.getToken();

      if (token) {
        // Llama al método para enviar el curso con el token
        this.postCurso(this.curso, token);
      } else {
        console.error('No se encontró el token');
      }
    }
  }

  postCurso(curso: any, token: string) {
    const url = 'https://www.presenteprofe.cl/api/v1/cursos';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado
      'Content-Type': 'application/json'
    });

    this.http.post(url, curso, { headers }).pipe(
      catchError((error) => {
        console.error('Error al enviar el curso:', error);
        return of(null);  // Devuelve null en caso de error
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
    localStorage.removeItem('usertype');
    localStorage.removeItem('userData');
    localStorage.removeItem('token'); // Remove the token from local storage
    this.router.navigate(['/home'], { replaceUrl: true });
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
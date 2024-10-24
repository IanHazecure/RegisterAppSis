import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

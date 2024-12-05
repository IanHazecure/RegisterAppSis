import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { QrScannerService } from './services/qr-scanner.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  username: string = "";
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeData: string = '';
  userData: any = {};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  

 // Método para cerrar sesión
 logout() {
  localStorage.removeItem('ingresado');
  localStorage.removeItem('usertype');
  localStorage.removeItem('userData');
  this.router.navigate(['/home'], { replaceUrl: true }); 
}
}

//constructor(
  //otras dependencias
  //private readonly qrScannerService: QrScannerService,
//) {
//}
 
//async scan(): Promise<void> {
  //const barcodes = await this.qrScannerService.scan() //esto abre la camara para escanear
 
  //aqui el codigo de logica con los qrs escaneados
//}
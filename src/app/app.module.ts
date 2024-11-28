import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_INITIALIZER } from '@angular/core';
// import { QrScannerService } from './services/qr-scanner.service';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, FormsModule, QRCodeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },],
  bootstrap: [AppComponent],
  
})
export class AppModule {}

// export function initQrScannerService(qrScannerService: QrScannerService) {
//   return () => qrScannerService.init();
// }
 
// export function qrScannerService() {
//   return {
//     provide: APP_INITIALIZER,
//     useFactory: initQrScannerService,
//     deps: [QrScannerService],
//     multi: true,
//   };
// }
 

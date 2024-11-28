import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/auth';

  constructor(private http: HttpClient) {}


  authenticate(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }


  async saveToken(token: string) {
  if (!token) {
    console.error('Intento de guardar un token vacío');
    return;
  }

  await Preferences.set({
    key: 'auth_token',
    value: token,
  });

  console.log('Token guardado exitosamente:', token);
}


  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'auth_token' });
    console.log('Token recuperado:', value); // Verifica si el token se recupera correctamente
    return value;
  }


  async clearToken() {
    await Preferences.remove({ key: 'auth_token' });
    console.log('Token eliminado'); // Confirma la eliminación del token
  }
}


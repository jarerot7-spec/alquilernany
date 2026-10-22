import { Component, inject, signal } from '@angular/core';
import { API_URL } from '../api';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';


@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private http= inject(HttpClient);
  private router= inject(Router);

  correo= '';
  password= '';
  mensaje= signal('');
  tipo= signal('');

  iniciarSesion(){
    this.mensaje.set('');
    this.tipo.set('');

    this.http.post<any>(API_URL + '/api/auth/login',{
      correo: this.correo.trim(),
      password: this.password
    }).subscribe({
      next: (data)=> {
        const usuario= data.usuario;
        if(!usuario.roles){
          usuario.roles= ['PROPIETARIO', 'INQUILINO'];
        }
        localStorage.setItem('nanysmart_usuario_actual', JSON.stringify(usuario));
        localStorage.setItem('alquismart_usuario_actual', JSON.stringify(usuario));

        this.mensaje.set(data.mensaje || 'Inicio de sesión correcto');
        this.tipo.set('success');
        setTimeout(() => this.router.navigate(['/dashboard']), 700);
      },
      error: (err)=>{
        if (err.status === 0) {
          this.mensaje.set('No se pudo conectar con el backend. Asegúrate de que esté iniciado')
        } else {
          this.mensaje.set(err.error?.error || 'Correo o contraseña incorrectos');
        }
        this.tipo.set('error');
      }
    });
  }
}

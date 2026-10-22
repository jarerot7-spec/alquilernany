import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private http= inject(HttpClient);
  private router= inject(Router);

  nombre= '';
  apellido= '';
  dni= '';
  correo= '';
  telefono= '';
  password= '';
  confirmPassword= '';

  mensaje= signal('');
  tipo= signal('');

  registrar(){
    this.mensaje.set('');
    this.tipo.set('');

    const nombre= this.nombre.trim();
    const apellido= this.apellido.trim();
    const dni= this.dni.trim();
    const correo= this.correo.trim();
    const telefono= this.telefono.trim();
    const password= this.password;

    //validacion dni
    if (!/^\d{8}$/.test(dni)) {
      this.mostrarError('El DNI debe contener exactamente 8 números');
      return;
    }

    //validacion telefono
    if (!/^\d{9}$/.test(telefono)) {
      this.mostrarError('El teléfono debe contener 9 números.');
      return;
    }

    //validacion password
    if (password.length < 6) {
      this.mostrarError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== this.confirmPassword) {
      this.mostrarError('Las contraseñas no coinciden.');
      return;
    }

    //envio a spring boot/ mysql
    this.http.post<any>('http:/localhost:8080/api/auth/register', {
      nombre, apellido, dni, correo, telefono, password
    }).subscribe({
      next: (data)=> {
        const usuarioGuardado= data.usuario || {
          id: Date.now(), nombre, apellido, dni, correo, telefono,
          roles: ['PROPIETARIO', 'INQUILINO']
        };
        if (!usuarioGuardado.roles) {
          usuarioGuardado.roles= ['PROPIETARIO', 'INQUILINO'];
        }
        const usuarios= JSON.parse(
          localStorage.getItem('nanysmart_usuarios') ||
          localStorage.getItem('alquismart_usuarios') || '[]'
        );
        usuarios.push(usuarioGuardado);
        localStorage.setItem('nanysmart_usuarios', JSON.stringify(usuarios));
        localStorage.setItem('alquismart_usuarios', JSON.stringify(usuarios));

        this.mensaje.set(data.mensaje || 'Cuenta creada correctamente');
        this.tipo.set('success');

        this.nombre= this.apellido = this.dni = this.correo = '';
        this.telefono= this.password = this.confirmPassword= '';

        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: (err) => {
        if (err.status === 0) {
          this.mostrarError('No se pudo conectar con el backend. Asegúrate de que esté iniciado.')
        } else {
          this.mostrarError(err.error?.error || 'Error al crear la cuenta.')
        }
      }
    });
  }

  private mostrarError(texto: string){
    this.mensaje.set(texto);
    this.tipo.set('error');
  }
}

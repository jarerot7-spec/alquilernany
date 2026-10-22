import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-funciones',
  imports: [RouterLink],
  templateUrl: './funciones.html',
  styleUrl: '../publico.css',
  encapsulation: ViewEncapsulation.None
})
export class Funciones {}
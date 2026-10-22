import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  imports: [RouterLink],
  templateUrl: './nosotros.html',
  styleUrl: '../publico.css',
  encapsulation: ViewEncapsulation.None
})
export class Nosotros {}
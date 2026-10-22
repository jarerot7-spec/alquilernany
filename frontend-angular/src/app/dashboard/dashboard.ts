import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { iniciarDashboard } from './dashboard.legacy';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements AfterViewInit{
  ngAfterViewInit() {
    iniciarDashboard();
  }
}

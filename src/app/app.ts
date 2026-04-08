import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeInventory } from './home-inventory/home-inventory';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    RouterOutlet, 
    HomeInventory
    ],
})
export class App {
  protected readonly title = signal('inventory');
}

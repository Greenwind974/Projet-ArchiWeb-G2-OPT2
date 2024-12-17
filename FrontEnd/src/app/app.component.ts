import { Component } from '@angular/core';
import {HeaderComponent} from './UI/header/header.component';
import {FooterComponent} from './UI/footer/footer.component';
import {RouterOutlet, Routes} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'terrain_de_petanque_Front_Angular';
}

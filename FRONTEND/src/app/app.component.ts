import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginComponent,
    CatalogueComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FRONTEND';
}

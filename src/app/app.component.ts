import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { IntroComponent } from './header/intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, IntroComponent, AboutComponent, ServicesComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cabinet Juridique Dupont';
}

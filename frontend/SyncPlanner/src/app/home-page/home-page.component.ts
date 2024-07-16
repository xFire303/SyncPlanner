import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

import { UserService } from '../user.service';
import { CalendarioComponent } from "../calendario/calendario.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [NavbarComponent, FooterComponent, CalendarioComponent],
})
export class HomePageComponent {
  username = '';

  constructor(private userService: UserService) {
    this.username = this.userService.getUserUsername();
  }
}

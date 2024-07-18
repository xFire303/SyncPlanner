import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

import { UserService } from '../services/user.service';
import { CalendarioComponent } from '../calendario/calendario.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [NavbarComponent, FooterComponent, CalendarioComponent],
})
export class HomePageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}

import { Component } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { UserService } from '../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}

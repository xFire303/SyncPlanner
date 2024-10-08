import { Component, OnInit } from '@angular/core';

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
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.userService.logout();
  }

  checkRuolo(ruolo_nome: string) {
    if (
      this.currentUser?.ruoli_sede.some(
        (ruolo: any) => ruolo.ruolo_nome === ruolo_nome
      )
    ) {
      return true;
    }

    return false;
  }
}

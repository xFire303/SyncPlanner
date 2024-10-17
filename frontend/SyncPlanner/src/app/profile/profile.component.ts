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
  currentUserSediRole: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUserSediRole().subscribe((sediRole) => {
      this.currentUserSediRole = sediRole.map((sediRole: any) => sediRole.role.name);
    });
  }

  logout() {
    this.userService.logout();
  }

  checkRuolo(ruolo_nome: string): boolean {
    return this.currentUserSediRole?.includes(ruolo_nome) ?? false;
  }
}

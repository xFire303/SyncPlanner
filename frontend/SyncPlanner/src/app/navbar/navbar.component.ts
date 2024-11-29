import { Component, OnInit } from '@angular/core';

import { BadgeModule } from 'primeng/badge';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { NotificheComponent } from '../notifiche/notifiche.component';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    BadgeModule,
    RouterModule,
    NotificheComponent,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  username: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((user) => {
      this.username = user.username;
    });
  }

  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}

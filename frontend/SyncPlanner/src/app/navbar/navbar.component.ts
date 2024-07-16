import { Component, OnInit } from '@angular/core';

import { BadgeModule } from 'primeng/badge';

import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterModule } from '@angular/router';

import { NotificheComponent } from '../notifiche/notifiche.component';

import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    BadgeModule,
    RouterOutlet,
    RouterModule,
    NotificheComponent,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}

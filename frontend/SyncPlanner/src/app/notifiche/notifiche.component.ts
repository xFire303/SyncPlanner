import { Component, EventEmitter, Output } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifiche',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './notifiche.component.html',
  styleUrl: './notifiche.component.css',
})
export class NotificheComponent {
  @Output() close = new EventEmitter<void>();

  notifications = [
    { creator: 'User1', time: '2 minuti fa', content: 'Notifica 1' },
    { creator: 'User2', time: '5 minuti fa', content: 'Notifica 2' },
    { creator: 'User3', time: '10 minuti fa', content: 'Notifica 3' },
  ];

  closeNotifications() {
    this.close.emit();
  }

  clearAllNotifications() {
    this.notifications = [];
  }
}

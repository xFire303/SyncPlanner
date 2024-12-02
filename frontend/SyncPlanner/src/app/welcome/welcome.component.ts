import { Component } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
}

import { Component, OnInit } from '@angular/core';

import { GestisciUtentiService } from '../../services/gestisci-utenti.service';

import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { idStateService } from '../../services/id-state.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-gestisci-utenti',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './gestisci-utenti.component.html',
  styleUrl: './gestisci-utenti.component.css',
})
export class GestisciUtentiComponent implements OnInit {
  utenti: any[] = [];
  currentUser: any;
  filteredUtenti: any[] = [];

  constructor(
    private gestisciUtentiService: GestisciUtentiService,
    private userService: UserService,
    private router: Router,
    private idStateService: idStateService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((user) => {
      this.currentUser = user;

      if (this.currentUser && this.currentUser.ruoli_sede) {
        const adminLocations = this.currentUser.ruoli_sede
          .filter((ruoloSede: any) => ruoloSede.ruolo_nome === 'admin')
          .map((ruoloSede: any) => ruoloSede.sede_nome);

        this.gestisciUtentiService.getAllUsers().subscribe((utenti) => {
          this.utenti = utenti;

          // Ordina gli utenti in modo che il primo sia quello corrispondente al currentUser
          this.utenti.sort((a, b) => {
            if (a.id === this.currentUser.id) {
              return -1;
            } else if (b.id === this.currentUser.id) {
              return 1;
            } else {
              return 0;
            }
          });

          this.filteredUtenti = this.utenti.filter((utente: any) => {
            return utente.ruoli_sede.some((ruoloSede: any) =>
              adminLocations.includes(ruoloSede.sede_nome)
            );
          });
        });
      }
    });
  }

  navigateToEditUtente(id: string): void {
    this.idStateService.setSelectedUtenteId(id);
    this.router.navigate(['/profile/edit-utente']);
  }
}

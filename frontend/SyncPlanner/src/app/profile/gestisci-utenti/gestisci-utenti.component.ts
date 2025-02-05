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
  ruoliSede: any[] = [];
  filteredUtenti: any[] = [];
  ruoliSedeUtentiAggregati: any[] = [];

  constructor(
    private gestisciUtentiService: GestisciUtentiService,
    private userService: UserService,
    private router: Router,
    private idStateService: idStateService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((user) => {
      this.currentUser = user;

      this.userService.getCurrentUserSediRole().subscribe((sediRole) => {
        this.ruoliSede = sediRole;

        if (this.currentUser && this.ruoliSede) {
          const adminLocations = this.ruoliSede
            .filter((ruoloSede: any) => ruoloSede.role.name === 'admin')
            .map((ruoloSede: any) => ruoloSede.sede.name);

          this.gestisciUtentiService.getAllUsers().subscribe((users) => {
            this.utenti = users;

            // Ordina gli utenti in modo che il primo sia quello corrispondente al currentUser
            this.utenti.sort((a, b) => {
              if (a.user.id === this.currentUser.id) {
                return -1;
              } else if (b.user.id === this.currentUser.id) {
                return 1;
              } else {
                return 0;
              }
            });

            // Aggrega i ruoli e le sedi per ogni utente
            const utentiMap = new Map();
            this.utenti.forEach((utente) => {
              if (!utentiMap.has(utente.user.id)) {
                utentiMap.set(utente.user.id, {
                  user: utente.user,
                  roles: [],
                });
              }
              utentiMap.get(utente.user.id).roles.push({
                sedeName: utente.sede.name,
                roleName: utente.role.name,
              });
            });

            this.ruoliSedeUtentiAggregati = Array.from(utentiMap.values());
          });
        }
      });
    });
  }

  navigateToEditUtente(id: string): void {
    this.idStateService.setSelectedUtenteId(id);
    this.router.navigate(['/profile/edit-utente']);
  }
}

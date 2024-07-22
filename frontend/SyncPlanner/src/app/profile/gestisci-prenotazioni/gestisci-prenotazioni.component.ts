import { Component, OnInit } from '@angular/core';

import { RouterOutlet, RouterModule, Router } from '@angular/router';

import { PrenotazioniService } from '../../services/prenotazioni.service';

import { idStateService } from '../../services/id-state.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-gestisci-prenotazioni',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './gestisci-prenotazioni.component.html',
  styleUrl: './gestisci-prenotazioni.component.css',
})
export class GestisciPrenotazioniComponent implements OnInit {
  prenotazioni: any[] = [];
  utenteSediAdmin: string[] = [];
  currentUser: any;

  constructor(
    private userService: UserService,
    private prenotazioniService: PrenotazioniService,
    private idStateService: idStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((user) => {
      this.currentUser = user;

      this.utenteSediAdmin = this.currentUser.ruoli_sede
        .filter((ruoloSede: any) => ruoloSede.ruolo_nome === 'admin')
        .map((ruoloSede: any) => ruoloSede.sede_nome);

      this.loadPrenotazioni();
    });
  }

  loadPrenotazioni(): void {
    this.prenotazioniService.getAllPrenotazioni().subscribe((prenotazioni) => {
      this.prenotazioni = prenotazioni
        .filter((prenotazione) => {
          const isAdminSede = this.utenteSediAdmin.includes(prenotazione.sede);

          const isUserPrenotazione =
            prenotazione.utente === this.currentUser.username;
          return isAdminSede || isUserPrenotazione;
        })
        .sort((a, b) => {
          if (a.utente === this.currentUser.username) {
            return -1;
          } else if (b.utente === this.currentUser.username) {
            return 1;
          } else {
            return 0;
          }
        });
    });
  }

  modificaPrenotazione(prenotazioneId: string): void {
    this.idStateService.setSelectedPrenotazioneId(prenotazioneId);
    this.router.navigate(['/profile/modifica-prenotazione']);
  }

  elimina(id: number) {
    this.prenotazioniService.deletePrenotazione(id).subscribe(() => {
      this.prenotazioniService
        .getAllPrenotazioni()
        .subscribe((prenotazioni) => {
          this.prenotazioni = prenotazioni;
        });
    });
  }
}

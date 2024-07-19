import { Component, OnInit } from '@angular/core';

import { RouterOutlet, RouterModule, Router } from '@angular/router';

import { PrenotazioniService } from '../../services/prenotazioni.service';

import { idStateService } from '../../services/id-state.service';

@Component({
  selector: 'app-gestisci-prenotazioni',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './gestisci-prenotazioni.component.html',
  styleUrl: './gestisci-prenotazioni.component.css',
})
export class GestisciPrenotazioniComponent implements OnInit {
  prenotazioni: any[] = [];

  constructor(
    private prenotazioniService: PrenotazioniService,
    private idStateService: idStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prenotazioniService.getAllPrenotazioni().subscribe((prenotazioni) => {
      this.prenotazioni = prenotazioni;
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

import { Component, OnInit } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { PrenotazioniService } from '../prenotazioni.service';

@Component({
  selector: 'app-gestisci-prenotazioni',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './gestisci-prenotazioni.component.html',
  styleUrl: './gestisci-prenotazioni.component.css',
})
export class GestisciPrenotazioniComponent implements OnInit {
  prenotazioni: any[] = [];

  constructor(private prenotazioniService: PrenotazioniService) {}

  ngOnInit(): void {
    this.prenotazioniService.getAllPrenotazioni().subscribe((prenotazioni) => {
      this.prenotazioni = prenotazioni;
    });
  }
}

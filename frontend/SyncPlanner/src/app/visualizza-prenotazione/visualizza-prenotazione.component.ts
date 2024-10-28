import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserService } from '../services/user.service';
import { PrenotazioniService } from '../services/prenotazioni.service';

import { Router } from '@angular/router';
import { PartecipantiService } from '../services/partecipanti.service';

@Component({
  selector: 'app-visualizza-prenotazione',
  standalone: true,
  imports: [InputTextModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './visualizza-prenotazione.component.html',
  styleUrl: './visualizza-prenotazione.component.css',
})
export class VisualizzaPrenotazioneComponent implements OnInit {
  @Input() id!: string;
  @Input() utente!: string;
  @Input() data!: string;
  @Input() sede!: string;

  @Output() close = new EventEmitter();
  @Output() apriGestisciPrenotazione = new EventEmitter();

  seiGiaPartecipante: boolean = false;
  proprietarioPrenotazione: boolean = false;
  idStateService: any;

  constructor(
    private userService: UserService,
    private prenotazioneService: PrenotazioniService,
    private router: Router,
    private partecipantiService: PartecipantiService
  ) {}

  ngOnInit(): void {
    this.prenotazioneService
      .getPrenotazione(+this.id)
      .subscribe((prenotazione) => {
        if (prenotazione.user.id === +this.userService.getUserId()) {
          this.proprietarioPrenotazione = true;
        } else {
          this.proprietarioPrenotazione = false;
        }
      });
  }

  chiudi() {
    this.close.emit();
  }

  modificaPrenotazione() {
    const arg = {
      event: {
        id: this.id,
        title: this.utente,
        startStr: this.data,
        extendedProps: {
          sede: this.sede,
        },
      },
    };

    this.apriGestisciPrenotazione.emit(arg);
  }

  aggiungitiAllaPrenotazione() {
    console.log('partecipante ' + this.userService.getUserId() + ' prenotazione ' + this.id);
    this.partecipantiService
      .aggiungiPartecipante(+this.userService.getUserId(), +this.id)
      .subscribe();
  }

  rimuovitiDallaPrenotazione() {
    // this.prenotazioneService
    //   .deleteUtenteDallaPrenotazione(+this.id, this.partecipante!)
    //   .subscribe();
  }
}

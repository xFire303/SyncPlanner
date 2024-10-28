import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserService } from '../services/user.service';
import { PrenotazioniService } from '../services/prenotazioni.service';

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

  seiGiaPartecipante: boolean = false;

  constructor(
    private userService: UserService,
    private prenotazioneService: PrenotazioniService
  ) {}

  ngOnInit(): void {
    this.prenotazioneService.getAllPrenotazioni().subscribe((prenotazioni) => {
      

    });
  }

  chiudi() {
    this.close.emit();
  }

  aggiungitiAllaPrenotazione() {
    // this.prenotazioneService
    //   .addUtenteAllaPrenotazione(+this.id, this.partecipante!)
    //   .subscribe();
  }

  rimuovitiDallaPrenotazione() {
    // this.prenotazioneService
    //   .deleteUtenteDallaPrenotazione(+this.id, this.partecipante!)
    //   .subscribe();
  }
}

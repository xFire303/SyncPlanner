import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserService } from '../services/user.service';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { FloatLabelModule } from 'primeng/floatlabel';

import { Router } from '@angular/router';
import { PartecipantiService } from '../services/partecipanti.service';

import { CapitalizePipe } from '../pipes/capitalize.pipe';

@Component({
  selector: 'app-visualizza-prenotazione',
  standalone: true,
  imports: [InputTextModule, InputGroupModule, InputGroupAddonModule, FloatLabelModule, CapitalizePipe],
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

  partecipantiList: string[] = [];

  seiGiaPartecipante: boolean = false;
  proprietarioPrenotazione: boolean = false;
  idStateService: any;

  CurrentUserUsername: string = '';
  isDataLoaded: boolean = false;

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
        if (prenotazione.user.id === this.userService.getUserId()) {
          this.proprietarioPrenotazione = true;
        } else {
          this.proprietarioPrenotazione = false;
        }

        this.partecipantiService
          .getPartecipantiByprenotazione(+this.id)
          .subscribe((partecipanti) => {
            partecipanti.forEach((element: { user: { username: string; }; }) => {
              this.partecipantiList.push(element.user.username);
            });

            this.userService.getCurrentUserData().subscribe((user) => {
              this.CurrentUserUsername = user.username;
  
              if(this.partecipantiList?.includes(this.CurrentUserUsername)) {
                this.seiGiaPartecipante = true;
              }

              this.isDataLoaded = true;
            })
          })
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
    this.partecipantiService
      .aggiungiPartecipante(+this.id)
      .subscribe(() => {
        this.close.emit();
      });
  }

  rimuovitiDallaPrenotazione() {
    this.partecipantiService
      .deletePartecipanteByPrenotazione(+this.id)
      .subscribe(() => {
        this.close.emit();
      });
  }
}

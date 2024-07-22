import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { PrenotazioniService } from '../../services/prenotazioni.service';

import { idStateService } from '../../services/id-state.service';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modifica-prenotazione',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modifica-prenotazione.component.html',
  styleUrl: './modifica-prenotazione.component.css',
})
export class ModificaPrenotazioneComponent {
  idPrenotazione!: string;

  @Input() showGestisciPrenotazione!: boolean;
  @Input() id!: string;
  @Input() data!: string;
  @Input() utente!: string;
  @Input() sede!: string;

  @Output() closeGestisciPrenotazione = new EventEmitter();

  constructor(
    private prenotazioniService: PrenotazioniService,
    private idStateService: idStateService
  ) {}
  ngOnInit() {
    this.idPrenotazione = this.idStateService.getSelectedPrenotazioneId()!;

    if (this.showGestisciPrenotazione) {
      this.modPrenotazioneForm.patchValue({
        'data-prenotazione': this.data,
        utente: this.utente,
        sede: this.sede,
      });
    } else {
      this.prenotazioniService
        .getAllPrenotazioni()
        .subscribe((prenotazioni) => {
          const prenotazione = prenotazioni.find(
            (prenotazione) => prenotazione.id === this.idPrenotazione
          );

          this.modPrenotazioneForm.patchValue({
            'data-prenotazione': prenotazione.data,
            utente: prenotazione.utente,
            sede: prenotazione.sede,
          });
        });
    }
  }

  modPrenotazioneForm = new FormGroup({
    'data-prenotazione': new FormControl<string>('', Validators.required),
    utente: new FormControl<string>('', Validators.required),
    sede: new FormControl<string>('', Validators.required),
  });

  submitForm() {
    if (this.modPrenotazioneForm.valid) {
    }
  }

  chiudiGestisciPrenotazione() {
    this.idStateService.clearSelectedPrenotazioneId();
    this.closeGestisciPrenotazione.emit();
  }

  elimina() {
    this.prenotazioniService
      .deletePrenotazione(+this.id)
      .subscribe(() => {
        this.chiudiGestisciPrenotazione();
      });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { Router, ActivatedRoute } from '@angular/router';

import { PrenotazioniService } from '../prenotazioni.service';

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
  idPrenotazione!: number;

  @Input() showGestisciPrenotazione!: boolean;
  @Input() data!: string;
  @Input() utente!: string;
  @Input() sede!: string;

  @Output() closeGestisciPrenotazione = new EventEmitter();

  constructor(
    private prenotazioniService: PrenotazioniService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.idPrenotazione = this.route.snapshot.params['id'];

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
          this.modPrenotazioneForm.patchValue({
            'data-prenotazione': prenotazioni[this.idPrenotazione].data,
            utente: prenotazioni[this.idPrenotazione].utente,
            sede: prenotazioni[this.idPrenotazione].sede,
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
    this.closeGestisciPrenotazione.emit();
  }
}

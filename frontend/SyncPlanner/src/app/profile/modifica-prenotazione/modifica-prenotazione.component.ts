import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterOutlet, RouterModule, Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { PrenotazioniService } from '../../services/prenotazioni.service';

import { idStateService } from '../../services/id-state.service';

import { CapitalizePipe } from '../../pipes/capitalize.pipe';

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
    CapitalizePipe,
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
    private idStateService: idStateService,
    private router : Router
  ) {}

  ngOnInit() {
    const capitalizePipe = new CapitalizePipe();

    this.idPrenotazione = this.idStateService.getSelectedPrenotazioneId()!;

    if (this.showGestisciPrenotazione) {
      this.modPrenotazioneForm.patchValue({
        date: this.data!,
        utente: this.utente!,
        sede: capitalizePipe.transform(this.sede!),
      });
    } else {
      this.prenotazioniService
        .getAllPrenotazioni()
        .subscribe((prenotazioni) => {
          const prenotazione = prenotazioni.find(
            (prenotazione) => prenotazione.id === this.idPrenotazione
          );

          this.modPrenotazioneForm.patchValue({
            date: prenotazione.date,
            utente: prenotazione.user.username,
            sede: capitalizePipe.transform(prenotazione.sede.name),
          });
        });
    }
  }

  modPrenotazioneForm = new FormGroup({
    date: new FormControl<string>('', Validators.required),
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

  modificaPrenotazione() {
    if (this.id === undefined) {
      this.prenotazioniService
        .updatePrenotazione(
          +this.idPrenotazione,
          this.modPrenotazioneForm.value
        )
        .subscribe(() => {
          this.router.navigate(['/profile/gestisci-prenotazioni']);
        });
    } else {
      this.prenotazioniService
        .updatePrenotazione(+this.id, this.modPrenotazioneForm.value)
        .subscribe(() => {
          this.chiudiGestisciPrenotazione();
        });
    }
  }

  elimina() {
    if (this.id === undefined) {
      this.prenotazioniService.deletePrenotazione(+this.idPrenotazione).subscribe(() => {
        this.chiudiGestisciPrenotazione();
      });
    } else {
      this.prenotazioniService.deletePrenotazione(+this.id).subscribe(() => {
        this.chiudiGestisciPrenotazione();
      });
    }
  }
}

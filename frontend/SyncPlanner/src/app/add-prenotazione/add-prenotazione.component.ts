import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { PrenotazioniService } from '../services/prenotazioni.service';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-prenotazione',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './add-prenotazione.component.html',
  styleUrl: './add-prenotazione.component.css',
})
export class AddPrenotazioneComponent implements OnInit {
  @Input() data: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() addPrenotazione = new EventEmitter<any>();

  private currentUser: any;
  currentSedi: any[] = [];

  constructor(
    private prenotazioniService: PrenotazioniService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((user) => {
      this.currentUser = user.username;

      this.addPrenotazioneForm.patchValue({
        data: this.data,
        sede: 'Sedi',
        utente: this.currentUser,
      });

      this.currentSedi = user.ruoli_sede
        .filter(
          (ruolo: any) =>
            ruolo.ruolo_nome === 'admin' || ruolo.ruolo_nome === 'keyOwner'
        )
        .map((ruolo: any) => ruolo.sede_nome);
    });
  }

  addPrenotazioneForm = new FormGroup({
    data: new FormControl('', [Validators.required]),
    utente: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required]),
  });

  isDefaultSedeSelected(): boolean {
    return this.addPrenotazioneForm.get('sede')?.value === 'Sedi';
  }

  submitForm() {
    if (this.addPrenotazioneForm.valid && !this.isDefaultSedeSelected()) {
      const prenotazione = {
        ...this.addPrenotazioneForm.value,
        partecipanti: []
      };

      this.prenotazioniService
        .createPrenotazione(prenotazione)
        .subscribe((prenotazione) => {
          this.addPrenotazione.emit(prenotazione);
          this.close.emit();
        });
    }
  }

  chiudi() {
    this.close.emit();
  }
}

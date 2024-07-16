import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { CascadeSelectModule } from 'primeng/cascadeselect';

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
    InputGroupAddonModule,
    CascadeSelectModule,
  ],
  templateUrl: './add-prenotazione.component.html',
  styleUrl: './add-prenotazione.component.css',
})
export class AddPrenotazioneComponent implements OnInit {
  @Input() data: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() addPrenotazione = new EventEmitter<any>();

  constructor(private prenotazioniService: PrenotazioniService, private userService: UserService) {}

  ngOnInit(): void {
    this.addPrenotazioneForm.patchValue({
      data: this.data,
      sede: 'Sedi',
      utente: this.userService.getUserUsername(),
    });

  }

  addPrenotazioneForm = new FormGroup({
    data: new FormControl('', [Validators.required]),
    utente: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required]),
  });

  submitForm() {
    if (this.addPrenotazioneForm.valid) {
      this.prenotazioniService
        .createPrenotazione(this.addPrenotazioneForm.value)
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

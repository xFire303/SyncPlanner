import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { CascadeSelectModule } from 'primeng/cascadeselect';

import { PrenotazioniService } from '../profile/prenotazioni.service';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

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

  constructor(private prenotazioniService: PrenotazioniService) {}

  ngOnInit(): void {
    this.addPrenotazioneForm.patchValue({
      data: this.data,
      sede: 'Sedi',
    });
  }

  addPrenotazioneForm = new FormGroup({
    data: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required]),
  });

  submitForm() {
    if (this.addPrenotazioneForm.valid) {
      this.prenotazioniService
        .createPrenotazione(this.addPrenotazioneForm.value)
        .subscribe();
      this.close.emit();
    }
  }

  chiudi() {
    this.close.emit();
  }
}

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
    InputGroupAddonModule,
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
    this.userService.getCurrentUserSediRole().subscribe((sediRole) => {
      this.userService.getCurrentUserData().subscribe((user) => {
        this.currentUser = user.username;

        this.addPrenotazioneForm.patchValue({
          date: this.data,
          sedeName: 'Sedi',
          userUsername: this.currentUser,
        });

        this.currentSedi = sediRole
          .filter((sediRole: any) => sediRole.role.name === 'admin' || sediRole.role.name === 'keyOwner')
          .map((sediRole: any) => sediRole.sede.name);

      });
    });
  }

  addPrenotazioneForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    userUsername: new FormControl('', [Validators.required]),
    sedeName: new FormControl('', [Validators.required]),
  });

  isDefaultSedeSelected(): boolean {
    return this.addPrenotazioneForm.get('sedeName')?.value === 'Sedi';
  }

  submitForm() {
    if (this.addPrenotazioneForm.valid) {
      const prenotazione = {
        ...this.addPrenotazioneForm.value
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

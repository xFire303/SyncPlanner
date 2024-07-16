import { Component } from '@angular/core';

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

  constructor(private prenotazioniService: PrenotazioniService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.idPrenotazione = this.route.snapshot.params['id'];

    this.prenotazioniService.getAllPrenotazioni().subscribe((prenotazioni) => {
      this.modPrenotazioneForm.patchValue({
        'data-prenotazione': prenotazioni[this.idPrenotazione].data,
        'sede': prenotazioni[this.idPrenotazione].sede
      });
    })

  }

  modPrenotazioneForm = new FormGroup({
    'data-prenotazione': new FormControl<string>('', Validators.required),
    'sede': new FormControl<string>('', Validators.required),
  });


  submitForm() {
    if (this.modPrenotazioneForm.valid) {
    }
  }
}

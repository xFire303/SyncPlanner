import { Component, EventEmitter, Output } from '@angular/core';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FiltroService } from '../services/filtro.service';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Output() closeFiltro = new EventEmitter<void>();

  constructor(private filtroService: FiltroService) {}

  filtroForm = new FormGroup({
    Verona: new FormControl(false),
    Padova: new FormControl(false),
    Milano: new FormControl(false),
    Como: new FormControl(false),
    Napoli: new FormControl(false),
    Roma: new FormControl(false),
  });

  chiudi() {
    this.closeFiltro.emit();
  }

  submitForm() {
    this.filtroService.saveOptions(this.filtroForm.value);
    this.chiudi();
  }
}

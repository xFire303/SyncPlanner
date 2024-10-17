import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FiltroService } from '../services/filtro.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css',
})
export class FiltroComponent implements OnInit {
  @Output() closeFiltro = new EventEmitter<void>();

  currentUserSedi: any;

  constructor(
    private filtroService: FiltroService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserSediRole().subscribe((sediRole) => {
      this.currentUserSedi = sediRole.map((sediRole: any) => sediRole.sede.name);
    });
  }

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

  checkSede(sede: string): boolean {
    return this.currentUserSedi?.includes(sede) ?? false;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Output() closeFiltro = new EventEmitter<void>();

  chiudi() {
    this.closeFiltro.emit();
  }
}

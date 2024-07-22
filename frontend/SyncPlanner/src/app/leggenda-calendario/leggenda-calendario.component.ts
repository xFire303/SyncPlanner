import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-leggenda-calendario',
  standalone: true,
  imports: [],
  templateUrl: './leggenda-calendario.component.html',
  styleUrl: './leggenda-calendario.component.css'
})
export class LeggendaCalendarioComponent {
  @Output() closeLeggenda = new EventEmitter<void>();

  chiudi() {
    this.closeLeggenda.emit();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-leggenda-calendario',
  standalone: true,
  imports: [],
  templateUrl: './leggenda-calendario.component.html',
  styleUrl: './leggenda-calendario.component.css',
})
export class LeggendaCalendarioComponent implements OnInit {
  @Output() closeLeggenda = new EventEmitter<void>();

  private currentSedi: string[] = [];

  private sedeColorMap: { [key: string]: string } = {
    'Verona': '#ff8a00',
    'Padova': '#00ff8a',
    'Milano': '#8a00ff',
    'Napoli': '#ff008a',
    'Como': '#4000ff',
    'Roma': '#ff001e',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUserSediRole().subscribe((sedi) => {
      this.currentSedi = sedi.map((sedi: any) => sedi.sede.name);
    });
  }

  chiudi() {
    this.closeLeggenda.emit();
  }
}

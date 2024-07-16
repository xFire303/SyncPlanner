import { Component } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddPrenotazioneComponent } from "../add-prenotazione/add-prenotazione.component";

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FullCalendarModule, AddPrenotazioneComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {
  showAddPrenotazione: boolean = false;
  selectedDate: string = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.apriPrenotazione(arg),
    events: [
      { title: 'event 1', date: '2024-07-01' },
      { title: 'event 2', date: '2024-07-02' },
    ],
  };

  apriPrenotazione(arg: any) {
    this.selectedDate = arg.dateStr;
    this.showAddPrenotazione = true;
  }

  chiudiPrenotazione() {
    this.showAddPrenotazione = false;
  }
}

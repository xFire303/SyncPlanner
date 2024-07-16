import { Component, OnInit } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddPrenotazioneComponent } from '../add-prenotazione/add-prenotazione.component';
import { ModificaPrenotazioneComponent } from '../profile/modifica-prenotazione/modifica-prenotazione.component';

import { UserService } from '../user.service';
import { PrenotazioniService } from '../profile/prenotazioni.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FullCalendarModule,
    AddPrenotazioneComponent,
    ModificaPrenotazioneComponent,
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  prenotazioniList: any[] = [];

  constructor(
    private userService: UserService,
    private prenotazioniService: PrenotazioniService
  ) {}

  ngOnInit(): void {
    this.prenotazioniService.getAllPrenotazioni().subscribe((prenotazioni) => {
      this.prenotazioniList = prenotazioni;
      this.updateCalendarEvents();
    });
  }

  showAddPrenotazione: boolean = false;
  showGestisciPrenotazione: boolean = false;
  selectedDate: string = '';
  selectedUtente: string = '';
  selectedSede: string = '';

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'Leggenda',
      center: 'title',
      right: 'today,prev,next',
    },
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.apriPrenotazione(arg),
    eventClick: (arg) => this.apriGestisciPrenotazione(arg),
    events: [],
    eventColor: '#163C70',
    themeSystem: 'bootstrap5',
    customButtons: {
      Leggenda: {
        text: 'Leggenda',
        click: function () {},
      },
    },
  };

  apriPrenotazione(arg: any) {
    this.selectedDate = arg.dateStr;
    this.showAddPrenotazione = true;
  }

  apriGestisciPrenotazione(arg: any) {
    this.selectedDate = arg.event.startStr;
    this.selectedUtente = arg.event.title;
    this.selectedSede = arg.event.extendedProps.sede;
    this.showGestisciPrenotazione = true;
  }

  chiudiPrenotazione() {
    this.showAddPrenotazione = false;
  }

  chiudiGestisciPrenotazione() {
    this.showGestisciPrenotazione = false;
  }

  updateCalendarEvents() {
    this.calendarOptions.events = this.prenotazioniList.map((prenotazione) => ({
      id: prenotazione.id,
      title: prenotazione.utente,
      start: prenotazione.data,
      extendedProps: { sede: prenotazione.sede },
    }));
  }

  onPrenotazioneAggiunta(prenotazione: any) {
    this.prenotazioniList.push(prenotazione);
    this.updateCalendarEvents();
  }
}

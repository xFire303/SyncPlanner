import { Component, OnInit } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddPrenotazioneComponent } from '../add-prenotazione/add-prenotazione.component';

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
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  username: string = '';

  prenotazioniList: any[] = [];

  constructor(
    private userService: UserService,
    private prenotazioniService: PrenotazioniService
  ) {
    this.username = this.userService.getUserUsername();
  }

  ngOnInit(): void {
    this.prenotazioniService.getAllPrenotazioni().subscribe((prenotazioni) => {
      this.prenotazioniList = prenotazioni;
      this.updateCalendarEvents();
    });
  }

  showAddPrenotazione: boolean = false;
  selectedDate: string = '';

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      end: 'today,prevYear,prev,next,nextYear'
    },
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.apriPrenotazione(arg),
    events: [],
  };

  apriPrenotazione(arg: any) {
    this.selectedDate = arg.dateStr;
    this.showAddPrenotazione = true;
  }

  chiudiPrenotazione() {
    this.showAddPrenotazione = false;
  }

  private updateCalendarEvents() {
    this.calendarOptions.events = this.prenotazioniList.map(prenotazione => ({
      id: prenotazione.id,
      title: `Prenotazione sede: ${prenotazione.sede}`,
      start: prenotazione.data,
    }));
  }
}

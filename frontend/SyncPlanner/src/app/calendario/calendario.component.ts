import { Component, OnInit } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddPrenotazioneComponent } from '../add-prenotazione/add-prenotazione.component';
import { ModificaPrenotazioneComponent } from '../profile/modifica-prenotazione/modifica-prenotazione.component';

import { UserService } from '../services/user.service';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { LeggendaCalendarioComponent } from '../leggenda-calendario/leggenda-calendario.component';
import { FiltroComponent } from '../filtro/filtro.component';
import { FiltroService } from '../services/filtro.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FullCalendarModule,
    AddPrenotazioneComponent,
    ModificaPrenotazioneComponent,
    LeggendaCalendarioComponent,
    FiltroComponent,
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  prenotazioniList: any[] = [];
  filteredPrenotazioniList: any[] = [];

  constructor(
    private prenotazioniService: PrenotazioniService,
    private filtroService: FiltroService
  ) {}

  ngOnInit(): void {
    this.prenotazioniService.getAllPrenotazioni().subscribe((prenotazioni) => {
      this.prenotazioniList = prenotazioni;
      this.updateCalendarEvents();
    });

    this.filtroService.filtroOptions$.subscribe((filterOptions) => {
      this.applyFilter(filterOptions);
    });
  }

  showAddPrenotazione: boolean = false;
  showGestisciPrenotazione: boolean = false;
  showFiltro: boolean = false;
  showLeggenda: boolean = false;
  selectedDate: string = '';
  selectedUtente: string = '';
  selectedSede: string = '';

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'Leggenda Filtro',
      center: 'title',
      right: 'today prev,next',
    },
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.apriPrenotazione(arg),
    eventClick: (arg) => this.apriGestisciPrenotazione(arg),
    events: [],
    customButtons: {
      Leggenda: {
        text: 'Leggenda',
        click: () => this.apriLeggenda(),
      },
      Filtro: {
        text: 'Filtro',
        click: () => this.filtro(),
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

  apriLeggenda() {
    this.showLeggenda = true;
  }

  chiudiPrenotazione() {
    this.showAddPrenotazione = false;
  }

  chiudiGestisciPrenotazione() {
    this.showGestisciPrenotazione = false;
  }

  chiudiLeggenda() {
    this.showLeggenda = false;
  }

  chiudiFiltro() {
    this.showFiltro = false;
  }

  updateCalendarEvents() {
    const sedeColorMap: any = {
      Verona: '#ff8a00',
      Milano: '#8a00ff',
      Padova: '#00ff8a',
      Napoli: '#ff008a',
      Como: '#4000ff',
      Roma: '#ff001e',
    };

    this.calendarOptions.events = this.filteredPrenotazioniList.map(
      (prenotazione) => ({
        id: prenotazione.id,
        title: prenotazione.utente,
        start: prenotazione.data,
        extendedProps: { sede: prenotazione.sede },
        color: sedeColorMap[prenotazione.sede],
      })
    );
  }

  onPrenotazioneAggiunta(prenotazione: any) {
    this.prenotazioniList.push(prenotazione);
    this.updateCalendarEvents();
  }

  filtro() {
    this.showFiltro = true;
  }

  applyFilter(filterOptions: any) {
    const selectedSedi = Object.keys(filterOptions).filter(
      (key) => filterOptions[key]
    );
    if (selectedSedi.length === 0) {
      this.filteredPrenotazioniList = this.prenotazioniList;
    } else {
      this.filteredPrenotazioniList = this.prenotazioniList.filter(
        (prenotazione) => selectedSedi.includes(prenotazione.sede)
      );
    }
    this.updateCalendarEvents();
  }
}

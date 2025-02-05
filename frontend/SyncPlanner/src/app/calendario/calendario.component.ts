import { Component, OnInit } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddPrenotazioneComponent } from '../add-prenotazione/add-prenotazione.component';
import { ModificaPrenotazioneComponent } from '../profile/modifica-prenotazione/modifica-prenotazione.component';

import { PrenotazioniService } from '../services/prenotazioni.service';
import { LeggendaCalendarioComponent } from '../leggenda-calendario/leggenda-calendario.component';
import { FiltroComponent } from '../filtro/filtro.component';
import { FiltroService } from '../services/filtro.service';
import { UserService } from '../services/user.service';

import itLocale from '@fullcalendar/core/locales/it';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { VisualizzaPrenotazioneComponent } from '../visualizza-prenotazione/visualizza-prenotazione.component';
import { switchMap } from 'rxjs/operators';

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
    VisualizzaPrenotazioneComponent,
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  prenotazioniList: any[] = [];
  filteredPrenotazioniList: any[] = [];

  currentUser: any;
  sediUtente: string[] = [];
  sediUtenteRoles: string[] = [];
  ruoliCurrentUser: any[] = [];

  constructor(
    private prenotazioniService: PrenotazioniService,
    private filtroService: FiltroService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updatePrenotazioni();
  }

  updatePrenotazioni() {
    this.userService
      .getCurrentUserData()
      .pipe(
        switchMap((user) => {
          this.currentUser = user;
          return this.userService.getCurrentUserSediRole();
        }),
        switchMap((sediRole) => {
          this.sediUtente = sediRole.map((sediRole: any) => sediRole.sede.name);
          this.ruoliCurrentUser = sediRole.map(
            (sediRole: any) => sediRole.role.name
          );
          this.sediUtenteRoles = sediRole
            .filter((sediRole: any) => sediRole.role.name === 'admin')
            .map((sediRole: any) => sediRole.sede.name);

          return this.prenotazioniService.getAllPrenotazioni();
        })
      )
      .subscribe((prenotazioni: any) => {
        this.prenotazioniList = prenotazioni.filter((prenotazione: any) =>
          this.sediUtente.includes(prenotazione.sede.name)
        );
        this.filteredPrenotazioniList = this.prenotazioniList;
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
  showVisualizzaPrenotazione: boolean = false;

  selectedId: string = '';
  selectedDate: string = '';
  selectedUtente: string = '';
  selectedSede: string = '';
  selectedPartecipanti: any[] = [];

  calendarOptions: CalendarOptions = {
    locale: itLocale,
    contentHeight: 'auto',
    height: 'auto',
    handleWindowResize: true,
    headerToolbar: {
      left: 'Leggenda Filtro',
      center: 'title',
      right: 'today prev,next',
    },
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.apriPrenotazione(arg),
    eventClick: (arg) => this.apriVisualizzaPrenotazione(arg),
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

  checkSediRoles(sede: string): boolean {
    if (this.sediUtenteRoles.includes(sede)) {
      return true;
    }
    return false;
  }

  checkUserRoles(): boolean {
    return (
      this.ruoliCurrentUser?.includes('admin') ||
      this.ruoliCurrentUser?.includes('keyOwner')
    );
  }

  apriPrenotazione(arg: any) {
    this.selectedDate = arg.dateStr;
    this.showAddPrenotazione = true;
  }

  apriGestisciPrenotazione(arg: any) {
    this.showVisualizzaPrenotazione = false;
    if (
      this.checkSediRoles(arg.event.extendedProps.sede) ||
      this.currentUser.username === arg.event.title
    ) {
      this.selectedId = arg.event.id;
      this.selectedDate = arg.event.startStr;
      this.selectedUtente = arg.event.title;
      this.selectedSede = arg.event.extendedProps.sede;
      this.showGestisciPrenotazione = true;
    }
  }

  apriVisualizzaPrenotazione(arg: any) {
    this.selectedId = arg.event.id;
    this.selectedDate = arg.event.startStr;
    this.selectedUtente = arg.event.title;
    this.selectedSede = arg.event.extendedProps.sede;
    this.showVisualizzaPrenotazione = true;
  }

  apriLeggenda() {
    this.showLeggenda = true;
  }

  chiudiPrenotazione() {
    this.showAddPrenotazione = false;
  }

  chiudiGestisciPrenotazione() {
    this.showGestisciPrenotazione = false;
    this.updatePrenotazioni();
  }

  chiudiLeggenda() {
    this.showLeggenda = false;
  }

  chiudiFiltro() {
    this.showFiltro = false;
  }

  chiudiVisualizzaPrenotazione() {
    this.showVisualizzaPrenotazione = false;
  }

  updateCalendarEvents() {
    const sedeColorMap: any = {
      verona: '#ff8a00',
      milano: '#8a00ff',
      padova: '#00ff8a',
      napoli: '#ff008a',
      como: '#4000ff',
      roma: '#ff001e',
    };

    this.calendarOptions.events = this.filteredPrenotazioniList.map(
      (prenotazione) => ({
        id: prenotazione.id,
        title: prenotazione.user.username,
        start: prenotazione.date,
        extendedProps: {
          sede: prenotazione.sede.name,
        },
        color: sedeColorMap[prenotazione.sede.name],
        textColor: 'black',
      })
    );
  }

  onPrenotazioneAggiunta() {
    this.updatePrenotazioni();
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
        (prenotazione) => selectedSedi.includes(prenotazione.sede.name)
      );
    }
    this.updateCalendarEvents();
  }
}

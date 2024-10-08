import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccediComponent } from './accedi/accedi.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { ProfileComponent } from './profile/profile.component';
import { GestisciPrenotazioniComponent } from './profile/gestisci-prenotazioni/gestisci-prenotazioni.component';
import { GestisciProfiloComponent } from './profile/gestisci-profilo/gestisci-profilo.component';
import { ModificaPrenotazioneComponent } from './profile/modifica-prenotazione/modifica-prenotazione.component';
import { AddPrenotazioneComponent } from './add-prenotazione/add-prenotazione.component';
import { GestisciUtentiComponent } from './profile/gestisci-utenti/gestisci-utenti.component';
import { EditUtenteComponent } from './profile/gestisci-utenti/edit-utente/edit-utente.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    title: 'Benvenuto',
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    title: 'SycnPlanner',
  },
  {
    path: 'accedi',
    component: AccediComponent,
    title: 'Accedi',
  },
  {
    path: 'registrati',
    component: RegistratiComponent,
    title: 'Registrati',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'gestisci-profilo',
        component: GestisciProfiloComponent,
        canActivate: [AuthGuard],
        title: 'Gestisci Profilo',
      },
      {
        path: 'gestisci-prenotazioni',
        component: GestisciPrenotazioniComponent,
        canActivate: [AuthGuard],
        title: 'Gestisci Prenotazioni',
      },
      {
        path: 'modifica-prenotazione',
        component: ModificaPrenotazioneComponent,
        canActivate: [AuthGuard],
        title: 'Modifica Prenotazione',
      },
      {
        path: 'gestisci-utenti',
        component: GestisciUtentiComponent,
        canActivate: [AuthGuard],
        title: 'Gestisci Utenti',
      },
      {
        path: 'edit-utente',
        component: EditUtenteComponent,
        canActivate: [AuthGuard],
        title: 'Modifica Utente',
      },
    ],
  },
  {
    path: 'add-prenotazione',
    component: AddPrenotazioneComponent,
    canActivate: [AuthGuard],
    title: 'Aggiungi Prenotazione',
  },
];

import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccediComponent } from './accedi/accedi.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { ProfileComponent } from './profile/profile.component';
import { GestisciPrenotazioniComponent } from './profile/gestisci-prenotazioni/gestisci-prenotazioni.component';
import { GestisciProfiloComponent } from './profile/gestisci-profilo/gestisci-profilo.component';
import { ModificaPrenotazioneComponent } from './profile/modifica-prenotazione/modifica-prenotazione.component';
import { NotificheComponent } from './notifiche/notifiche.component';
import { AddPrenotazioneComponent } from './add-prenotazione/add-prenotazione.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Benvenuto',
  },
  {
    path: 'home',
    component: HomePageComponent,
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
    children: [
      {
        path: 'gestisci-profilo',
        component: GestisciProfiloComponent,
        title: 'Gestisci Profilo',
      },
      {
        path: 'gestisci-prenotazioni',
        component: GestisciPrenotazioniComponent,
        title: 'Gestisci Prenotazioni',
      },
      {
        path: 'modifica-prenotazione/:id',
        component: ModificaPrenotazioneComponent,
        title: 'Modifica Prenotazione',
      },
    ],
  },
  {
    path: 'add-prenotazione/:date',
    component: AddPrenotazioneComponent,
    title: 'Aggiungi Prenotazione',
  }
];

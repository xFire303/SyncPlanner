import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllPrenotazioni(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/prenotazioni`);
  }

  createPrenotazione(prenotazione: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/prenotazioni`, prenotazione);
  }

  updatePrenotazione(prenotazione: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/prenotazioni/${prenotazione.id}`, prenotazione);
  }

  deletePrenotazione(prenotazione: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/prenotazioni/${prenotazione.id}`);
  }
}

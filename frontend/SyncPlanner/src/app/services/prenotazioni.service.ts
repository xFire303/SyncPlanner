import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioniService {
  constructor(private http: HttpClient, private router: Router) {}

  seiGiaPartecipante$ = new BehaviorSubject<boolean>(false);

  getAllPrenotazioni(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/bookings`);
  }

  getPrenotazione(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/bookings/${id}`);
  }

  createPrenotazione(prenotazione: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/bookings`,
      prenotazione
    );
  }

  updatePrenotazione(id: number, prenotazione: any): Observable<any> {
    return this.http.patch<any>(
      `${environment.apiUrl}/bookings/${id}`,
      prenotazione
    );
  }

  deletePrenotazione(prenotazioneId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/bookings/${prenotazioneId}`
    );
  }
}

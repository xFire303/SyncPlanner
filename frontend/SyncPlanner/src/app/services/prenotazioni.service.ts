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

  createPrenotazione(prenotazione: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/bookings`,
      prenotazione
    );
  }

  updatePrenotazione(prenotazione: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/bookings/${prenotazione.id}`,
      prenotazione
    );
  }

  deletePrenotazione(prenotazioneId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/bookings/${prenotazioneId}`
    );
  }

  checkSeiGiaPartecipante(
    prenotazioneId: number,
    utente: any
  ): Observable<boolean> {
    return this.http
      .get<any>(`${environment.apiUrl}/bookings/${prenotazioneId}`)
      .pipe(
        switchMap((prenotazione) => {
          const isPartecipante = prenotazione.partecipanti.includes(utente);
          return of(isPartecipante);
        })
      );
  }

  addUtenteAllaPrenotazione(
    prenotazioneId: number,
    utente: any
  ): Observable<any> {
    return this.checkSeiGiaPartecipante(prenotazioneId, utente).pipe(
      switchMap((isPartecipante) => {
        if (isPartecipante) {
          this.seiGiaPartecipante$.next(true);
          return of(null);
        } else {
          this.seiGiaPartecipante$.next(false);
          return this.http
            .get<any>(`${environment.apiUrl}/bookings/${prenotazioneId}`)
            .pipe(
              switchMap((prenotazione) => {
                prenotazione.partecipanti.push(utente);
                return this.http.patch<any>(
                  `${environment.apiUrl}/bookings/${prenotazioneId}`,
                  { partecipanti: prenotazione.partecipanti }
                );
              })
            );
        }
      })
    );
  }

  // deleteUtenteDallaPrenotazione(prenotazioneId: number, utente: any): Observable<any> {
  //   return this.http.delete<any>(`${environment.apiUrl}/prenotazioni/${prenotazioneId}`, { partecipanti: utente });
  // }
}

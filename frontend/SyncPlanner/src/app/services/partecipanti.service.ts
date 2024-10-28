import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartecipantiService {

  constructor(private http: HttpClient) { }

  aggiungiPartecipante(partecipante: number, prenotazioneId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/bookingParticipants`, {partecipante, prenotazioneId});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartecipantiService {
  constructor(private http: HttpClient) {}

  aggiungiPartecipante(bookingId: number): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/bookingParticipants`,
      { bookingId },
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    );
  }

  getPartecipantiByprenotazione(bookingId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/bookingParticipants/${bookingId}`,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    );
  }

  deletePartecipanteByPrenotazione(bookingId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/bookingParticipants/${bookingId}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      }
    );
  }
}

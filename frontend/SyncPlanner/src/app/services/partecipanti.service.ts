import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartecipantiService {

  constructor(private http: HttpClient) { }

  aggiungiPartecipante(userId: number, bookingId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/bookingParticipants`, {userId, bookingId});
  }

  getPartecipantiByprenotazione(bookingId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/bookingParticipants/${bookingId}`);
  }

  deletePartecipanteByPrenotazione(bookingId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/bookingParticipants/${bookingId}`, {params: {userId}});
  }
}

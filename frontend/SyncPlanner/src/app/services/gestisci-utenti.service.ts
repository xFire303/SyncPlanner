import { Injectable } from '@angular/core';

import { delay, Observable, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GestisciUtentiService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users`);
  }

  updateUserRoles(
    id: number,
    updatedRoles: any[],
    removedRoles: any[]
  ): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/user/${id}/roles`, {
        updatedRoles,
        removedRoles,
      })
      .pipe(
        delay(500),
        tap(() => this.router.navigate(['/profile/gestisci-utenti']))
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/user/${id}`).pipe(
      delay(500),
      tap(() => this.router.navigate(['/profile/gestisci-utenti']))
    );
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GestisciUtentiService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users`);
  }

  updateUserRoles(id: number, roles: any[]): Observable<any> {
    this.router.navigate(['/profile/gestisci-utenti']);
    return this.http.patch<any>(`${environment.apiUrl}/user/${id}/roles`, roles);
  }

  deleteUser(id: number): Observable<any> {
    this.router.navigate(['/profile/gestisci-utenti']);
    return this.http.delete<any>(`${environment.apiUrl}/user/${id}`);
  }
}

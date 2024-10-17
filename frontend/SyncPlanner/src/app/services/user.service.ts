import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer, throwError, from, of } from 'rxjs';
import {
  map,
  takeUntil,
  switchMap,
  tap,
  delay,
  catchError,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import * as bcrypt from 'bcryptjs';

import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private logoutTimer$ = new Subject<void>();
  private localStorageKey = 'is_authenticated';

  private errorMessage$ = new Subject<string>();
  getErrorMessage$ = this.errorMessage$.asObservable();

  private successMessage$ = new Subject<string>();
  getSuccessMessage$ = this.successMessage$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  checkIfEmailAlreadyExists(userData: any): Promise<boolean> {
    return lastValueFrom(
      this.http.get<string[]>(`${environment.apiUrl}/users/emails`).pipe(
        map((emails) => {
          return emails.includes(userData.email);
        }),
        catchError((error) => {
          console.error('Error fetching emails:', error);
          return of(false);
        })
      )
    );
  }

  register(userData: any, sediData: string[]): Observable<any> {
    userData.password = this.encryptPassword(userData.password);

    const userModel = {
      name: userData.nome.toLowerCase(),
      surname: userData.cognome.toLowerCase(),
      email: userData.email,
      password: userData.password,
    };

    const registrationData = {
      user: userModel,
      sedi: sediData.map((sede) => sede.toLowerCase()),
    };

    this.successMessage$.next('Registrazione effettuata con successo');

    return this.http
      .post(`${environment.apiUrl}/signup`, registrationData)
      .pipe(
        delay(1500),
        tap(() => this.navigateTo('/accedi'))
      );
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/signin`, userData).pipe(
      map((user: any) => {
        this.successMessage$.next('Accesso effettuato con successo');
        localStorage.setItem(this.localStorageKey, 'true');
        localStorage.setItem('idUtente', user.toString());
        this.startLogoutTimer();
      }),
      delay(1500),
      tap(() => this.navigateTo('/home')),
      catchError((error) => {
        this.errorMessage$.next(error.error);;
        return throwError(() => error);
      })
    );
  }

  getCurrentUserData(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/user/${localStorage.getItem('idUtente')}`
    );
  }

  getCurrentUserSediRole(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/user/${localStorage.getItem('idUtente')}/roles`
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.localStorageKey) === 'true';
  }

  startLogoutTimer(): void {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    timer(oneWeekInMilliseconds)
      .pipe(takeUntil(this.logoutTimer$))
      .subscribe(() => this.logout());
  }

  stopLogoutTimer(): void {
    this.logoutTimer$.next();
    this.logoutTimer$.complete();
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this.navigateTo('/accedi');
  }

  private navigateTo(route: string): void {
    timer(1000).subscribe(() => this.router.navigate([route]));
  }

  changeCredentials(userData: any): Observable<any> {
    userData.password = this.encryptPassword(userData.password);

    this.successMessage$.next('Credenziali modificate con successo');

    return this.http
      .patch(
        `${environment.apiUrl}/users/${localStorage.getItem('idUtente')}`,
        userData
      )
      .pipe(tap(() => this.navigateTo('/profile/gestisci-profilo')));
  }
}

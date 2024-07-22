import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer, throwError } from 'rxjs';
import { map, takeUntil, switchMap, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js';

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
    const key = environment.encryptionKey;
    return CryptoJS.AES.encrypt(password, key).toString();
  }

  decryptPassword(encryptedPassword: string): string {
    const key = environment.encryptionKey;
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  register(userData: any, sediData: any): Observable<any> {
    userData.password = this.encryptPassword(userData.password);

    const ruoliSede = sediData.map((sede: string) => ({
      sede_nome: sede,
      ruolo_nome: 'guest',
    }));

    const username = userData.nome.toLowerCase() + userData.cognome[0].toUpperCase();

    const userModel = {
      id: userData.id,
      nome: userData.nome.toLowerCase(),
      cognome: userData.cognome.toLowerCase(),
      username: username,
      email: userData.email,
      password: userData.password,
      ruoli_sede: ruoliSede,
    };

    return this.http
      .get<any[]>(`${environment.apiUrl}/users?email=${userData.email}`)
      .pipe(
        switchMap((users) => {
          const emailExists = users.some(
            (user) => user.email === userData.email
          );
          if (emailExists) {
            return throwError(() =>
              this.errorMessage$.next("L'email inserita è già stata usata")
            );
          }

          this.successMessage$.next('Registrazione effettuata con successo');
          
          return this.http.post(`${environment.apiUrl}/users`, userModel).pipe(
            delay(1500),
            tap(() => this.navigateTo('/accedi'))
          );
        })
      );
  }

  login(userData: any): Observable<any> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/users?email=${userData.email}`)
      .pipe(
        map((users) => {
          const user = users.find((u) => u.email === userData.email);
          if (!user) {
            throw this.errorMessage$.next("L'email inserita è sbagliata");
          }
          const decryptedPassword = this.decryptPassword(user.password);
          if (decryptedPassword !== userData.password) {
            throw this.errorMessage$.next('La password inserita è sbagliata');
          }

          this.successMessage$.next('Accesso effettuato con successo');
          localStorage.setItem(this.localStorageKey, 'true');
          localStorage.setItem('idUtente', user.id.toString());
          this.startLogoutTimer();
          return user;
        }),
        delay(1500),
        tap(() => this.navigateTo('/home'))
      );
  }

  checkIfEmailAlreadyExists(userData: any): Promise<boolean> {
    const users$ = this.http
      .get<any[]>(`${environment.apiUrl}/users?email=${userData.email}`)
      .pipe(
        map((users) => {
          return users.some((user) => user.email === userData.email);
        })
      );

    return lastValueFrom(users$);
  }

  getCurrentUserData(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/users/${localStorage.getItem('idUtente')}`
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

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(() => new Error('An error occurred'));
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

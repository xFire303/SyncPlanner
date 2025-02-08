import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer, throwError, of } from 'rxjs';
import { map, takeUntil, tap, delay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jwt-decode';

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

  checkIfEmailAlreadyExists(userData: any): Observable<boolean> {
    return this.http
      .get<boolean>(
        `${environment.apiUrl}/users/check-email?email=${userData.email}`
      )
      .pipe(
        map((exists: boolean) => {
          if (exists) {
            this.errorMessage$.next('Esiste già un utente con questa email');
            return false; // L'email esiste
          } else {
            return true; // L'email non esiste
          }
        }),
        catchError((error) => {
          this.errorMessage$.next('Si è verificato un errore nel server');
          return of(false); // Se c'è un errore nel recupero, considera false
        })
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
    return this.http
      .post(`${environment.apiUrl}/signin`, userData, { responseType: 'text' })
      .pipe(
        map((token: string) => {
          this.successMessage$.next('Accesso effettuato con successo');
          localStorage.setItem(this.localStorageKey, 'true');
          localStorage.setItem('token', token);
          this.startLogoutTimer();
        }),
        delay(1500),
        tap(() => this.navigateTo('/home')),
        catchError((error) => {
          this.errorMessage$.next(error.error);
          return throwError(() => error.error);
        })
      );
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt.jwtDecode(token);
      return decodedToken.id;
    }
    return 0;
  }

  getCurrentUserData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  getCurrentUserSediRole(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/roles`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });
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
      .patch(`${environment.apiUrl}/user`, userData, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .pipe(tap(() => this.navigateTo('/profile/gestisci-profilo')));
  }

  getUserId(): number {
    return +this.getUserIdFromToken() || 0;
  }
}

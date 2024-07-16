import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer, BehaviorSubject, throwError } from 'rxjs';
import { map, takeUntil, switchMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private logoutTimer$ = new Subject<void>();
  private localStorageKey = 'is_authenticated';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  encryptPassword(password: string): string {
    const key = environment.encryptionKey;
    return CryptoJS.AES.encrypt(password, key).toString();
  }

  decryptPassword(encryptedPassword: string): string {
    const key = environment.encryptionKey;
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  register(userData: any): Observable<any> {
    userData.password = this.encryptPassword(userData.password);

    return this.http
      .get<any[]>(`${environment.apiUrl}/users?email=${userData.email}`)
      .pipe(
        switchMap((users) => {
          const emailExists = users.some(
            (user) => user.email === userData.email
          );
          if (emailExists) {
            return throwError(
              () => new Error("L'email inserita è già stata usata")
            );
          }
          return this.http
            .post(`${environment.apiUrl}/users`, userData)
            .pipe(tap(() => this.navigateTo('/accedi')));
        }),
        catchError(this.handleError)
      );
  }

  login(userData: any): Observable<any> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/users?email=${userData.email}`)
      .pipe(
        map((users) => {
          const user = users.find((u) => u.email === userData.email);
          if (!user) {
            throw new Error("L'email inserita è sbagliata");
          }
          const decryptedPassword = this.decryptPassword(user.password);
          if (decryptedPassword !== userData.password) {
            throw new Error('La password inserita è sbagliata');
          }
          localStorage.setItem(this.localStorageKey, 'true');
          this.setUserData(user.username, user.email);
          this.startLogoutTimer();
          this.currentUserSubject.next(user);
          return user;
        }),
        tap(() => this.navigateTo('/home')),
        catchError(this.handleError)
      );
  }

  setUserData(username: string, email: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
  }

  getUserUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getUserEmail(): string {
    return localStorage.getItem('email') || '';
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser;
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
    this.currentUserSubject.next(null);
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
    return this.http
      .put(`${environment.apiUrl}/users`, userData)
      .pipe(tap(() => this.navigateTo('/profile/gestisci-profilo')));
  }
}

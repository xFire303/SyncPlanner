import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  private filtroOptions = new Subject<any>();
  filtroOptions$ = this.filtroOptions.asObservable();

  constructor() {}

  saveOptions(data: any) {
    this.filtroOptions.next(data);
  }
}

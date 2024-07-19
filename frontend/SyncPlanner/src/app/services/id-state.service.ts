import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class idStateService {
  private selectedPrenotazioneId: string | null = null;
  private selectedUtenteId: string | null = null;

  setSelectedPrenotazioneId(id: string): void {
    this.selectedPrenotazioneId = id;
  }

  getSelectedPrenotazioneId(): string | null {
    return this.selectedPrenotazioneId;
  }

  clearSelectedPrenotazioneId(): void {
    this.selectedPrenotazioneId = null;
  }

  setSelectedUtenteId(id: string): void {
    this.selectedUtenteId = id;
  }

  getSelectedUtenteId(): string | null {
    return this.selectedUtenteId;
  }

  clearSelectedUtenteId(): void {
    this.selectedUtenteId = null;
  }
}

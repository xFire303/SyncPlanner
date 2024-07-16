import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPrenotazioneComponent } from './modifica-prenotazione.component';

describe('ModificaPrenotazioneComponent', () => {
  let component: ModificaPrenotazioneComponent;
  let fixture: ComponentFixture<ModificaPrenotazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaPrenotazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaPrenotazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

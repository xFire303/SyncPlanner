import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciPrenotazioniComponent } from './gestisci-prenotazioni.component';

describe('GestisciPrenotazioniComponent', () => {
  let component: GestisciPrenotazioniComponent;
  let fixture: ComponentFixture<GestisciPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestisciPrenotazioniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestisciPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

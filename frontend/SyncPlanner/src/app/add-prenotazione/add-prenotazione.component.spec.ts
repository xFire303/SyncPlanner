import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrenotazioneComponent } from './add-prenotazione.component';

describe('AddPrenotazioneComponent', () => {
  let component: AddPrenotazioneComponent;
  let fixture: ComponentFixture<AddPrenotazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPrenotazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrenotazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

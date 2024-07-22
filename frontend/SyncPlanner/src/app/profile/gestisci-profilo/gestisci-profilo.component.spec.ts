import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciProfiloComponent } from './gestisci-profilo.component';

describe('GestisciProfiloComponent', () => {
  let component: GestisciProfiloComponent;
  let fixture: ComponentFixture<GestisciProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestisciProfiloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestisciProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

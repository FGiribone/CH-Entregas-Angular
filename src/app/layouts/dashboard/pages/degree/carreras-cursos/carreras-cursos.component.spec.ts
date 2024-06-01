import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasCursosComponent } from './carreras-cursos.component';

describe('CarrerasCursosComponent', () => {
  let component: CarrerasCursosComponent;
  let fixture: ComponentFixture<CarrerasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrerasCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrerasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

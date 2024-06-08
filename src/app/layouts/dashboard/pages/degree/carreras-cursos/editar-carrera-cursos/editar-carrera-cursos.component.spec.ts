import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCarreraCursosComponent } from './editar-carrera-cursos.component';

describe('EditarCarreraCursosComponent', () => {
  let component: EditarCarreraCursosComponent;
  let fixture: ComponentFixture<EditarCarreraCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarCarreraCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCarreraCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

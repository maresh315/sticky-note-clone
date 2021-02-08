import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNotesComponent } from './modify-notes.component';

describe('ModifyNotesComponent', () => {
  let component: ModifyNotesComponent;
  let fixture: ComponentFixture<ModifyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

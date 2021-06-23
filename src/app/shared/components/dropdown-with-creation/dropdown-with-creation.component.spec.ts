import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWithCreationComponent } from './dropdown-with-creation.component';

describe('DropdownWithCreationComponent', () => {
  let component: DropdownWithCreationComponent;
  let fixture: ComponentFixture<DropdownWithCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownWithCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownWithCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

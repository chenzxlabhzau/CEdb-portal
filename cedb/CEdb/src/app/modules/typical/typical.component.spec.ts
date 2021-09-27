import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypicalComponent } from './typical.component';

describe('SearchComponent', () => {
  let component: TypicalComponent;
  let fixture: ComponentFixture<TypicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

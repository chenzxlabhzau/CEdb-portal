import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypicalResultComponent } from './typical-result.component';

describe('SearchResultComponent', () => {
  let component: TypicalResultComponent;
  let fixture: ComponentFixture<TypicalResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypicalResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypicalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

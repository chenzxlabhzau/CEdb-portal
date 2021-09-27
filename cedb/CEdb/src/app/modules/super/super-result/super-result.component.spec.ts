import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperResultComponent } from './super-result.component';

describe('SearchResultComponent', () => {
  let component: SuperResultComponent;
  let fixture: ComponentFixture<SuperResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

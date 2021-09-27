import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSumComponent } from './data-sum.component';

describe('DataSumComponent', () => {
  let component: DataSumComponent;
  let fixture: ComponentFixture<DataSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

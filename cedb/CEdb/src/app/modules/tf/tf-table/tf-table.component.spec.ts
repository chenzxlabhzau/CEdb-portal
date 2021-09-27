import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfTableComponent } from './tf-table.component';

describe('TfTableComponent', () => {
  let component: TfTableComponent;
  let fixture: ComponentFixture<TfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

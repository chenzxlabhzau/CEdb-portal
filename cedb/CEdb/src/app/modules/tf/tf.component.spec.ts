import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TFComponent } from './tf.component';

describe('TFComponent', () => {
  let component: TFComponent;
  let fixture: ComponentFixture<TFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancerInfoComponent } from './enhancer-info.component';

describe('EnhancerInfoComponent', () => {
  let component: EnhancerInfoComponent;
  let fixture: ComponentFixture<EnhancerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnhancerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

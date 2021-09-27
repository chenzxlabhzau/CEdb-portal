import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancerEqtlComponent } from './enhancer-eqtl.component';

describe('EnhancerEqtlComponent', () => {
  let component: EnhancerEqtlComponent;
  let fixture: ComponentFixture<EnhancerEqtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnhancerEqtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancerEqtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

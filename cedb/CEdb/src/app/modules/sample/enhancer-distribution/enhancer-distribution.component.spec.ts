import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancerDistributionComponent } from './enhancer-distribution.component';

describe('EnhancerDistributionComponent', () => {
  let component: EnhancerDistributionComponent;
  let fixture: ComponentFixture<EnhancerDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnhancerDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancerDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

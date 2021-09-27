import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperEnhancerComponent } from './super-enhancer.component';

describe('SuperEnhancerComponent', () => {
  let component: SuperEnhancerComponent;
  let fixture: ComponentFixture<SuperEnhancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperEnhancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperEnhancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

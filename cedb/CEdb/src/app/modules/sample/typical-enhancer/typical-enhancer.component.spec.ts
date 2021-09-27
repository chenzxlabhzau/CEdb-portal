import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypicalEnhancerComponent } from './typical-enhancer.component';

describe('TypicalEnhancerComponent', () => {
  let component: TypicalEnhancerComponent;
  let fixture: ComponentFixture<TypicalEnhancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypicalEnhancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypicalEnhancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

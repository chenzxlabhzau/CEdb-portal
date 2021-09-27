import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperRegionComponent } from './super-region.component';

describe('SearchRegionComponent', () => {
  let component: SuperRegionComponent;
  let fixture: ComponentFixture<SuperRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

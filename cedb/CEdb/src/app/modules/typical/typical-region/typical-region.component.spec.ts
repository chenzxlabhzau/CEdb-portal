import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypicalRegionComponent } from './typical-region.component';

describe('SearchRegionComponent', () => {
  let component: TypicalRegionComponent;
  let fixture: ComponentFixture<TypicalRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypicalRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypicalRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

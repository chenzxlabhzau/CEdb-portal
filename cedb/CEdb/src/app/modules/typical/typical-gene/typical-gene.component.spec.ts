import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypicalGeneComponent } from './typical-gene.component';

describe('SearchGeneComponent', () => {
  let component: TypicalGeneComponent;
  let fixture: ComponentFixture<TypicalGeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypicalGeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypicalGeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

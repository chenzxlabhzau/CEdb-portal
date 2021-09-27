import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperGeneComponent } from './super-gene.component';

describe('SearchGeneComponent', () => {
  let component: SuperGeneComponent;
  let fixture: ComponentFixture<SuperGeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperGeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperGeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

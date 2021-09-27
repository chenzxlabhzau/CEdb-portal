import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleBasicInfoComponent } from './sample-basic-info.component';

describe('SampleBasicInfoComponent', () => {
  let component: SampleBasicInfoComponent;
  let fixture: ComponentFixture<SampleBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

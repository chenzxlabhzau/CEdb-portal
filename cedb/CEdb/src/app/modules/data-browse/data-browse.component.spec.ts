import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBrowseComponent } from './data-browse.component';

describe('DataBrowseComponent', () => {
  let component: DataBrowseComponent;
  let fixture: ComponentFixture<DataBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

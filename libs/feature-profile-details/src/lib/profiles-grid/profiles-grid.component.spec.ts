import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesGridComponent } from './profiles-grid.component';

describe('ProfilesGridComponent', () => {
  let component: ProfilesGridComponent;
  let fixture: ComponentFixture<ProfilesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

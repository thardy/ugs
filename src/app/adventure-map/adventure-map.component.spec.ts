import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureMapComponent } from './adventure-map.component';

describe('AdventureMapComponent', () => {
  let component: AdventureMapComponent;
  let fixture: ComponentFixture<AdventureMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

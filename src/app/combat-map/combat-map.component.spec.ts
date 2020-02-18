import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatMapComponent } from './combat-map.component';

describe('CombatMapComponent', () => {
  let component: CombatMapComponent;
  let fixture: ComponentFixture<CombatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

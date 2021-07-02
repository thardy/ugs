import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTestComponent } from './editor-test.component';

describe('EditorTestComponent', () => {
  let component: EditorTestComponent;
  let fixture: ComponentFixture<EditorTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

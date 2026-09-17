import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDialog } from './model-dialog';

describe('ModelDialog', () => {
  let component: ModelDialog;
  let fixture: ComponentFixture<ModelDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

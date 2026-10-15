import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadItemDialog } from './read-item-dialog';

describe('ReadItemDialog', () => {
  let component: ReadItemDialog;
  let fixture: ComponentFixture<ReadItemDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadItemDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadItemDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

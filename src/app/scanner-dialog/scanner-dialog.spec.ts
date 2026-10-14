import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerDialog } from './scanner-dialog';

describe('ScannerDialog', () => {
  let component: ScannerDialog;
  let fixture: ComponentFixture<ScannerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannerDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

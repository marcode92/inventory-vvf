import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvItemFile } from './inv-item-file';

describe('InvItemFile', () => {
  let component: InvItemFile;
  let fixture: ComponentFixture<InvItemFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvItemFile],
    }).compileComponents();

    fixture = TestBed.createComponent(InvItemFile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

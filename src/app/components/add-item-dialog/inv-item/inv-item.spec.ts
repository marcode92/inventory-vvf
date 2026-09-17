import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvItem } from './inv-item';

describe('InvItem', () => {
  let component: InvItem;
  let fixture: ComponentFixture<InvItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvItem],
    }).compileComponents();

    fixture = TestBed.createComponent(InvItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechItem } from './tech-item';

describe('TechItem', () => {
  let component: TechItem;
  let fixture: ComponentFixture<TechItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TechItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

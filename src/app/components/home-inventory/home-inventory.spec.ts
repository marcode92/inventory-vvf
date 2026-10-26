import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInventory } from './home-inventory';

describe('HomeInventory', () => {
  let component: HomeInventory;
  let fixture: ComponentFixture<HomeInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInventory],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeInventory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

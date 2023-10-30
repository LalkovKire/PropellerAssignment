import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBoardComponent } from './filter-board.component';

describe('FilterBoardComponent', () => {
  let component: FilterBoardComponent;
  let fixture: ComponentFixture<FilterBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBoardComponent]
    });
    fixture = TestBed.createComponent(FilterBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

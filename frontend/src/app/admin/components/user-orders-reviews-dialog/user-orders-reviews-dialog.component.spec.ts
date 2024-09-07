import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersReviewsDialogComponent } from './user-orders-reviews-dialog.component';

describe('UserOrdersReviewsDialogComponent', () => {
  let component: UserOrdersReviewsDialogComponent;
  let fixture: ComponentFixture<UserOrdersReviewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrdersReviewsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrdersReviewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QotdEditDialogComponent } from './qotd-edit-dialog.component';

describe('QotdEditDialogComponent', () => {
  let component: QotdEditDialogComponent;
  let fixture: ComponentFixture<QotdEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QotdEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QotdEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

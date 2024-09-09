import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QotdEditComponent } from './qotd-edit.component';

describe('QotdEditComponent', () => {
  let component: QotdEditComponent;
  let fixture: ComponentFixture<QotdEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QotdEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QotdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneNewsComponent } from './one-news.component';

describe('OneNewsComponent', () => {
  let component: OneNewsComponent;
  let fixture: ComponentFixture<OneNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

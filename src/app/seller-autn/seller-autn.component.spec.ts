import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAutnComponent } from './seller-autn.component';

describe('SellerAutnComponent', () => {
  let component: SellerAutnComponent;
  let fixture: ComponentFixture<SellerAutnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerAutnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAutnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsModal } from './product-details-modal';

describe('ProductDetailsModal', () => {
  let component: ProductDetailsModal;
  let fixture: ComponentFixture<ProductDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

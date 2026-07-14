import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';
import { Product } from '../../../core/models/products';

describe('ProductCard', () => {
  let fixture: ComponentFixture<ProductCard>;
  let el: HTMLElement;

  const mockProduct: Product = {
    sku: '123-ABC',
    name: 'Test Widget',
    price: 100,
    rrp: 150,
    image: 'https://example.com/widget.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the product name', () => {
    const name = el.querySelector('.product-card__name');
    expect(name?.textContent).toContain('Test Widget');
  });

  it('should display the product image with correct src and alt', () => {
    const img = el.querySelector('img') as HTMLImageElement;
    expect(img.src).toContain('example.com/widget.png');
    expect(img.alt).toBe('Test Widget');
  });

  it('should display the price', () => {
    const price = el.querySelector('.product-card__price');
    expect(price?.textContent).toContain('100');
  });

  it('should display the savings and the RRP', () => {
    const savings = el.querySelector('.product-card__savings');
    expect(savings?.textContent).toContain('50');
    expect(savings?.textContent).toContain('150');
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { ProductListing } from './product-listing';
import { ProductService } from '../../core/services/product';
import { Product } from '../../core/models/products';

describe('ProductListing', () => {
  const mockProducts: Product[] = [
    { sku: '111', name: 'Product One', price: 100, rrp: 150, image: 'img1.png' },
    { sku: '222', name: 'Product Two', price: 200, rrp: 250, image: 'img2.png' },
    { sku: '333', name: 'Product Three', price: 50, rrp: 80, image: 'img3.png' }
  ];

  async function setup(serviceStub: Partial<ProductService>): Promise<ComponentFixture<ProductListing>> {
    await TestBed.configureTestingModule({
      imports: [ProductListing],
      providers: [
        { provide: ProductService, useValue: serviceStub }
      ]
    }).compileComponents();

    return TestBed.createComponent(ProductListing);
  }

  it('should create', async () => {
    const fixture = await setup({ getAll: () => of([]) });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call the service on init', async () => {
    const getAllSpy = vi.fn(() => of(mockProducts));
    const fixture = await setup({ getAll: getAllSpy });
    fixture.detectChanges();
    expect(getAllSpy).toHaveBeenCalledOnce();
  });

  it('should render a product-card for each product returned', async () => {
    const fixture = await setup({ getAll: () => of(mockProducts) });
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-product-card');
    expect(cards.length).toBe(3);
  });

  it('should show a loading message before the service responds', async () => {
    const pending = new Subject<Product[]>();
    const fixture = await setup({ getAll: () => pending.asObservable() });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading');
  });

  it('should show an error message when the service fails', async () => {
    const fixture = await setup({
      getAll: () => throwError(() => new Error('boom'))
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Unable to load');
    expect(fixture.nativeElement.querySelector('.product-grid')).toBeFalsy();
  });

  it('should show the empty state when the service returns no products', async () => {
    const fixture = await setup({ getAll: () => of([]) });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No products found');
  });
});
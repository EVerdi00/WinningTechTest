import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product';
import { Product } from '../models/products';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from /MOCK_DATA.json via GET', () => {
    const mockProducts: Product[] = [
      { sku: '111', name: 'Test One', price: 100, rrp: 150, image: 'img1.png' },
      { sku: '222', name: 'Test Two', price: 200, rrp: 250, image: 'img2.png' }
    ];

    let result: Product[] | undefined;
    service.getAll().subscribe(products => {
      result = products;
    });

    const req = httpMock.expectOne('/MOCK_DATA.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockProducts);

    expect(result).toEqual(mockProducts);
  });
});
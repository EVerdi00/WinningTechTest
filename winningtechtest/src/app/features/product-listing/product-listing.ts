import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../core/models/products';
import { ProductService } from '../../core/services/product';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-product-listing',
  imports: [ProductCard],
  templateUrl: './product-listing.html',
  styleUrl: './product-listing.scss'
})
export class ProductListing implements OnInit {
  private productService = inject(ProductService);

  protected products = signal<Product[]>([]);
  protected loading = signal(true);
  protected error = signal<string | null>(null);

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.error.set('Unable to load the products. Please try again later.');
        this.loading.set(false);
      }
    });
  }
}
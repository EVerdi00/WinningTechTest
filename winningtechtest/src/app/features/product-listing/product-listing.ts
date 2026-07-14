import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Product } from '../../core/models/products';
import { ProductService } from '../../core/services/product';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ProductDetailsModal } from '../../shared/components/product-details-modal/product-details-modal';

@Component({
  selector: 'app-product-listing',
  imports: [ProductCard, ProductDetailsModal],
  templateUrl: './product-listing.html',
  styleUrl: './product-listing.scss'
})
export class ProductListing implements OnInit {
  private productService = inject(ProductService);
  private modal = viewChild(ProductDetailsModal);

  protected products = signal<Product[]>([]);
  protected loading = signal(true);
  protected error = signal<string | null>(null);
  protected selectedProduct = signal<Product | null>(null);

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

  protected onAddToCart(product: Product): void {
    this.selectedProduct.set(product);
    this.modal()?.open();
  }

  protected onModalClosed(): void {
    this.selectedProduct.set(null);
  }
}
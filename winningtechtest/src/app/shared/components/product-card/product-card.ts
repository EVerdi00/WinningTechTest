import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../core/models/products';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  product = input.required<Product>();
}
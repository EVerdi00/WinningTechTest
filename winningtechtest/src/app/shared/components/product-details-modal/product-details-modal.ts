import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../core/models/products';

@Component({
  selector: 'app-product-details-modal',
  imports: [CurrencyPipe],
  templateUrl: './product-details-modal.html',
  styleUrl: './product-details-modal.scss'
})
export class ProductDetailsModal {
  product = input<Product | null>(null);
  closed = output<void>();

  private dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialogRef()?.nativeElement.showModal();
  }

  close(): void {
    this.dialogRef()?.nativeElement.close();
    this.closed.emit();
  }
}
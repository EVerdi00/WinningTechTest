import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from '../../models/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    count: computed(() =>
      store.items().reduce((total, item) => total + item.quantity, 0)
    )
  })),
  withMethods((store) => ({
    addItem(product: Product): void {
      const items = store.items();
      const existing = items.find((item) => item.product.sku === product.sku);

      if (existing) {
        patchState(store, {
          items: items.map((item) =>
            item.product.sku === product.sku
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        });
      } else {
        patchState(store, {
          items: [...items, { product, quantity: 1 }]
        });
      }
    }
  }))
);
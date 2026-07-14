# WinningStore

A small eCommerce application built with Angular 21 for the WinningTech technical test.

The app has a Home page and a Product Listing page. Products are loaded via HTTP from a local JSON file and displayed in a responsive grid. Clicking "Add to Cart" opens a modal with the product's details and adds the product to a cart managed by an NgRx Signals store. A live item-count badge is shown next to the Products link in the navigation bar.

## Prerequisites

- Node.js 20.19+ (or 22.12+)
- npm 10+

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

The app will be available at `http://localhost:4200`.

Run the unit tests:

```bash
npm test
```

## Project structure

```
src/app/
├── core/                      # App-wide singletons
│   ├── models/                # TypeScript interfaces (Product)
│   ├── services/              # Injectable services (ProductService)
│   └── store/                 # NgRx Signals stores (CartStore)
├── features/                  # Route-level page components
│   ├── home/
│   └── product-listing/
├── shared/                    # Reusable UI components
│   └── components/
│       ├── navbar/
│       ├── product-card/
│       └── product-details-modal/
├── app.config.ts              # App-wide providers (router, HttpClient)
├── app.routes.ts              # Route definitions
├── app.ts                     # Root component
└── app.html                   # Root shell (navbar + <router-outlet />)
```

The `core/`, `features/`, and `shared/` split is the main modularity pattern. Standalone components are used throughout (no NgModules), and every component declares its own dependencies via the `imports` array.

## Data

Product data is served as a static JSON file from `public/MOCK_DATA.json`. `ProductService` fetches it via Angular's `HttpClient` and returns an `Observable<Product[]>`. The `ProductListing` page subscribes to it on `ngOnInit` and manages `loading`, `error`, and `products` state as signals.

## Cart state

Cart state is managed by a `CartStore` (`core/store/cart/cart.store.ts`) built with `@ngrx/signals`. The store holds a list of cart items and exposes:

- `items`: the raw state signal.
- `count`: a computed signal summing all quantities.
- `addItem(product)`: adds a product; if it already exists, increments its quantity.

The store is registered with `{ providedIn: 'root' }`, so every component that injects it receives the same singleton instance. `ProductListing` dispatches to it on the "Add to Cart" event, and `Navbar` reads `count` to display the badge.

## Modal

The product details modal (`shared/components/product-details-modal`) is built with the native HTML `<dialog>` element and opened via `showModal()`. This gives us focus trapping, Escape-to-close, backdrop rendering, and correct ARIA modal semantics from the browser. No additional dependencies or focus-management code required. The modal fires a single `closed` event forwarded from the native `close` event, so all close paths (x button, Esc button) are handled uniformly.

## Testing

Tests are written with **Vitest** (Angular's modern default). Coverage includes:

- **`ProductService`**: verified against a fake HTTP layer using `provideHttpClientTesting()`, asserting the request URL, method, and returned data.
- **`ProductCard`**: verified in isolation with a mocked `Product` input, asserting the rendered name, image, price, and savings.
- **`ProductListing`**: verified with a mocked `ProductService` (using `of()` and `throwError()` from RxJS), asserting the service is called on init, cards are rendered for each product, and the loading, error, and empty states display correctly.
- **App, Home, Navbar**: smoke tests confirming each component instantiates with a stubbed router.

Component tests mock the `ProductService` directly rather than intercepting HTTP, to keep each component's behaviour isolated from the service's implementation details.

## Notable decisions

- **NgRx Signals over classic NgRx**: a single-store, single-method cart doesn't justify the actions / reducers / effects / selectors ceremony of classic NgRx, and Signals integrates naturally with the rest of the signal-based components.
- **Native `<dialog>` over Angular Material**: a UI library isn't warranted for one modal, and the native element handles accessibility concerns for free.
- **`inject()` over constructor injection**: modern Angular idiom, and keeps class definitions tidy.
- **Feature/shared/core folder split**: replaces the role `NgModule` used to play in organising an Angular codebase.

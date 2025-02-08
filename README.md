# Shopping Cart Implementation

## Overview
This project is a TypeScript-based shopping cart that integrates with a Price API to retrieve product prices dynamically. It calculates the cart subtotal, tax (12.5%), and total payable amount, rounding values where necessary.

## Features
- Add products to the cart with quantity.
- Retrieve product prices from the Price API.
- Maintain cart state (items, subtotal, tax, and total).
- Round up totals where necessary.
- Unit tests using Jest.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Amankumar321/shopping-cart-assignment.git
   cd shopping-cart-assignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Price API:
   ```sh
   npm run serve-products
   ```

## Running Tests
To run unit tests, use:
```sh
npm test
```

## Assumptions & Trade-offs
- The Price API is available at `http://localhost:3001/products/{product}`.
- Prices are fetched dynamically and stored in memory.
- Tax is applied at a flat rate of 12.5% and rounded up.
- No persistent storage (database) is used.

## How to Test the Solution
1. Run the Price API (`npm run serve-products`).
2. Run unit tests (`npm test`).

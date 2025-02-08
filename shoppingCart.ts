import axios from 'axios';

const PRICE_API_BASE_URL = 'http://localhost:3001/products';
const TAX_RATE = 0.125;

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

class ShoppingCart {
  private items: CartItem[] = [];

  async addProduct(name: string, quantity: number): Promise<void> {
    const price = await this.getProductPrice(name);
    const existingItem = this.items.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ name, quantity, price });
    }
  }

  private async getProductPrice(name: string): Promise<number> {
    try {
      const response = await axios.get(`${PRICE_API_BASE_URL}/${name}`);
      return response.data.price;
    } catch (error) {
      throw new Error(`Error fetching price for ${name}`);
    }
  }

  getCartState() {
    const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.ceil(subtotal * TAX_RATE * 100) / 100;
    const total = subtotal + tax;

    return {
      items: this.items,
      subtotal: Math.ceil(subtotal * 100) / 100,
      tax,
      total: Math.ceil(total * 100) / 100,
    };
  }
}

export default ShoppingCart;

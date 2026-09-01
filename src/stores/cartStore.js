import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  actions: {
    addItem(product, qty = 1) {
      const existing = this.items.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity += qty;
      } else {
        this.items.push({ product, quantity: qty, price: product.price });
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
    },
    updateQuantity(productId, qty) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        if (qty <= 0) {
          this.removeItem(productId);
        } else {
          item.quantity = qty;
        }
      }
    },
    clearCart() {
      this.items = [];
    }
  }
});
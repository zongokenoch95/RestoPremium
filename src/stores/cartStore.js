import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  actions: {
    addItem(product, qty = 1) {
      // String() sécurise la comparaison si l'ID est un nombre d'un côté et un texte de l'autre
      const existing = this.items.find(item => String(item.product?.id) === String(product.id));
      if (existing) {
        existing.quantity += Number(qty);
      } else {
        this.items.push({ 
          product, 
          quantity: Number(qty), 
          price: product.price 
        });
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(item => String(item.product?.id) !== String(productId));
    },
    updateQuantity(productId, qty) {
      const item = this.items.find(item => String(item.product?.id) === String(productId));
      if (item) {
        if (qty <= 0) {
          this.removeItem(productId);
        } else {
          item.quantity = Number(qty);
        }
      }
    },
    clearCart() {
      this.items = [];
    }
  }
});
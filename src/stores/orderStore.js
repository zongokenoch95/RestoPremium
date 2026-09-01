import { defineStore } from 'pinia'
import { createOrder } from '@/services/api'
import { useCartStore } from './cartStore'

export const useOrderStore = defineStore('order', {
  state: () => ({
    lastOrder: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async submitOrder(orderData) {
      const cartStore = useCartStore();
      this.isLoading = true;
      this.error = null;
      try {
        const payload = {
          ...orderData,
          items: cartStore.items,
          total: cartStore.totalPrice,
          date: new Date().toISOString()
        };
        const response = await createOrder(payload);
        this.lastOrder = response;
        cartStore.clearCart();
      } catch (err) {
        this.error = "Erreur lors de la validation de la commande";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
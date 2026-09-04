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
      const cartStore = useCartStore()
      this.isLoading = true
      this.error = null
      
      try {
        const payload = {
          ...orderData,
          items: [...cartStore.items], // Copie des articles pour éviter les mutations
          total: cartStore.totalPrice || cartStore.totalAmount,
          date: new Date().toISOString()
        }
        
        const response = await createOrder(payload)
        
        // On fusionne le payload (qui contient items, total, tableNumber...) avec la réponse du serveur (qui contient l'ID généré)
        this.lastOrder = {
          ...payload,
          ...(response || {}),
          orderId: response?.id || response?.orderId || payload.orderId || Date.now()
        }
        
        cartStore.clearCart()
      } catch (err) {
        this.error = "Erreur lors de la validation de la commande"
        console.error(err)
      } finally {
        this.isLoading = false
      }
    }
  }
})
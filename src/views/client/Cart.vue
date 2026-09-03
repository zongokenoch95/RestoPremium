<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
import CartItem from '@/components/CartItem.vue'
import PromoBanner from '@/components/PromoBanner.vue'

const cartStore = useCartStore()
const orderStore = useOrderStore()
const router = useRouter()

const customerName = ref('')
const tableNumber = ref('')
const specialNotes = ref('')
const errorMessage = ref('')

const handleCheckout = async () => {
  if (!customerName.value.trim() || !tableNumber.value) {
    errorMessage.value = 'Veuillez renseigner votre nom et votre numéro de table.'
    return
  }

  errorMessage.value = ''

  const orderPayload = {
    customerName: customerName.value,
    tableNumber: Number(tableNumber.value),
    specialNotes: specialNotes.value,
    items: cartStore.items,
    total: cartStore.totalPrice,
    date: new Date().toISOString()
  }

  const success = await orderStore.submitOrder(orderPayload)
  if (success) {
    cartStore.clearCart()
    router.push('/confirmation')
  } else {
    errorMessage.value = "Une erreur est survenue lors de l'envoi de la commande."
  }
}
</script>

<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">Mon Panier</h1>
      <p class="page-subtitle">Révisez votre sélection avant de finaliser l'expérience.</p>

      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Votre panier est actuellement vide.</p>
        <router-link to="/menu" class="btn-gold">Consulter le menu</router-link>
      </div>

      <div v-else class="cart-content">
        <!-- Liste des produits -->
        <div class="items-list">
          <CartItem 
            v-for="item in cartStore.items" 
            :key="item.id" 
            :item="item" 
          />
        </div>

        <!-- Formulaire de commande -->
        <form @submit.prevent="handleCheckout" class="checkout-form">
          <div v-if="errorMessage" class="error-banner">
            {{ errorMessage }}
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="customerName">Nom du client</label>
              <input 
                id="customerName" 
                v-model="customerName" 
                type="text" 
                placeholder="Ex: Mr/Mme Zongo" 
                required 
              />
            </div>

            <div class="form-group">
              <label for="tableNumber">Numéro de table</label>
              <input 
                id="tableNumber" 
                v-model="tableNumber" 
                type="number" 
                placeholder="Ex: 12" 
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label for="specialNotes">Instructions Spéciales (Allergies, Cuisson...)</label>
            <textarea 
              id="specialNotes" 
              v-model="specialNotes" 
              rows="3" 
              placeholder="Ajoutez une note pour le chef..."
            ></textarea>
          </div>

          <div class="cart-summary">
            <div class="total-label">Total de votre commande :</div>
            <div class="total-amount">{{ cartStore.totalPrice.toLocaleString() }} FCFA</div>
            <button 
              type="submit" 
              class="btn-submit" 
              :disabled="orderStore.isLoading"
            >
              {{ orderStore.isLoading ? 'Envoi en cours...' : 'Passer la commande →' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Section Promotions & Événements -->
      <section class="promo-section">
        <PromoBanner />
      </section>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  background-color: #0d0d0d;
  color: #fff;
  min-height: 100vh;
  padding: 3rem 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: #d4af37;
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin-bottom: 0.2rem;
}

.page-subtitle {
  color: #888;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 1rem;
}

.btn-gold {
  display: inline-block;
  background-color: #d4af37;
  color: #000;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
}

.checkout-form {
  background: #141414;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #222;
  margin-top: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 0.4rem;
}

.form-group input, .form-group textarea {
  background: #1f1f1f;
  border: 1px solid #333;
  color: #fff;
  padding: 0.75rem;
  border-radius: 4px;
}

.error-banner {
  background-color: #5a1a1a;
  color: #ff8888;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.cart-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #222;
}

.total-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #d4af37;
}

.btn-submit {
  background-color: #d4af37;
  color: #000;
  border: none;
  padding: 0.9rem 1.8rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

.promo-section {
  margin-top: 5rem;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .cart-summary {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getOrders } from '@/services/api'

const orders = ref([])
let intervalId = null

const fetchKitchenOrders = async () => {
  orders.value = await getOrders()
}

// Fonction pour calculer le total d'une commande
const calculateOrderTotal = (items) => {
  if (!items) return 0
  return items.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0
    const qty = item.quantity || 1
    return sum + (price * qty)
  }, 0)
}

// Fonction pour marquer la commande comme prête (la retire de orders.json et l'envoie dans history.json)
const markAsReady = async (orderId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/orders/${orderId}/complete`, {
      method: 'POST'
    })
    if (response.ok) {
      await fetchKitchenOrders() // Rafraîchit l'affichage immédiatement
    }
  } catch (err) {
    console.error("Erreur lors de la validation de la commande", err)
  }
}

onMounted(() => {
  fetchKitchenOrders()
  intervalId = setInterval(fetchKitchenOrders, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="kitchen-container">
    <header class="kitchen-header">
      <h1>Écran Cuisine - Commandes en Cours</h1>
      <span class="live-indicator">● En direct</span>
    </header>

    <div v-if="orders.length === 0" class="no-orders">
      <p>Aucune commande pour le moment...</p>
    </div>

    <div class="orders-grid">
      <div v-for="order in orders" :key="order.orderId || order.id" class="order-card">
        <div class="order-header">
          <span class="table-badge">Table n°{{ order.tableNumber }}</span>
          <span class="order-time">{{ new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
        </div>

        <div class="customer-info">
          <h3>{{ order.customerName }}</h3>
          <p class="order-id">Réf: #{{ order.orderId || order.id }}</p>
        </div>

        <div class="order-items">
          <div v-for="item in order.items" :key="item.product?.id || item.id" class="kitchen-item">
            <div class="item-details">
              <span class="item-qty">x{{ item.quantity }}</span>
              <span class="item-name">{{ item.product?.name || item.name }}</span>
            </div>
            <span class="item-subtotal">
              {{ ((item.product?.price || item.price || 0) * item.quantity).toLocaleString() }} F
            </span>
          </div>
        </div>

        <!-- Total de la commande calculé automatiquement -->
        <div class="order-total-section">
          <span>Total de la commande :</span>
          <strong>{{ calculateOrderTotal(order.items).toLocaleString() }} FCFA</strong>
        </div>

        <div v-if="order.specialNotes" class="special-notes">
          <strong>Note :</strong> {{ order.specialNotes }}
        </div>

        <div class="order-actions">
          <button class="btn-ready" @click="markAsReady(order.orderId || order.id)">
            Marquer comme prête
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kitchen-container {
  background-color: #0b0b0b;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
}

.kitchen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #222;
  padding-bottom: 1rem;
}

.kitchen-header h1 {
  font-family: 'Playfair Display', serif;
  color: #d4af37;
  font-size: 1.8rem;
}

.live-indicator {
  color: #2ecc71;
  font-weight: bold;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

.no-orders {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-top: 4rem;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.order-card {
  background-color: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-badge {
  background-color: #d4af37;
  color: #000;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.order-time {
  color: #888;
  font-size: 0.85rem;
}

.customer-info h3 {
  margin: 0 0 0.2rem 0;
  font-size: 1.1rem;
  color: #fff;
}

.order-id {
  font-size: 0.75rem;
  color: #777;
  margin: 0;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: #1a1a1a;
  padding: 0.8rem;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.kitchen-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #222;
  padding-bottom: 0.4rem;
}

.kitchen-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-details {
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.item-qty {
  color: #d4af37;
  font-weight: bold;
}

.item-subtotal {
  color: #aaa;
  font-size: 0.9rem;
  font-weight: 500;
}

.order-total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f1f1f;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #333;
  font-size: 0.95rem;
}

.order-total-section strong {
  color: #2ecc71;
  font-size: 1.1rem;
}

.special-notes {
  background-color: #2c1a1a;
  border-left: 3px solid #e74c3c;
  padding: 0.5rem;
  font-size: 0.85rem;
  color: #ff8888;
  border-radius: 0 4px 4px 0;
}

.order-actions {
  margin-top: auto;
}

.btn-ready {
  width: 100%;
  background-color: #27ae60;
  color: #fff;
  border: none;
  padding: 0.7rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-ready:hover {
  background-color: #219653;
}
</style>
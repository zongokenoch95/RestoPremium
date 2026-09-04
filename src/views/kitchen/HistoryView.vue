<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const historyOrders = ref([])
let intervalId = null

// Fonction pour récupérer l'historique depuis le serveur
const fetchHistoryOrders = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/history')
    if (response.ok) {
      historyOrders.value = await response.json()
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'historique", err)
  }
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

// Formatage de la date de validation
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + date.toLocaleDateString()
}

onMounted(() => {
  fetchHistoryOrders()
  // Actualise automatiquement toutes les 5 secondes en direct
  intervalId = setInterval(fetchHistoryOrders, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="history-container">
    <header class="history-header">
      <div class="header-left">
        <router-link to="/kitchen" class="back-link">← Retour Cuisine</router-link>
        <h1>Historique des Commandes Traitées</h1>
      </div>
      <span class="live-indicator">● En direct</span>
    </header>

    <div v-if="historyOrders.length === 0" class="no-orders">
      <p>Aucune commande traitée pour le moment...</p>
    </div>

    <div class="orders-grid">
      <div v-for="order in historyOrders.slice().reverse()" :key="order.orderId || order.id" class="order-card">
        <div class="order-header">
          <span class="table-badge">Table n°{{ order.tableNumber }}</span>
          <span class="order-status-badge">Prête / Servie</span>
        </div>

        <div class="customer-info">
          <h3>{{ order.customerName }}</h3>
          <p class="order-id">Réf: #{{ order.orderId || order.id }}</p>
          <p class="completion-time" v-if="order.completedAt">
            Validée à : {{ formatDate(order.completedAt) }}
          </p>
        </div>

        <div class="order-items">
          <div v-for="item in order.items" :key="item.product?.id || item.id" class="history-item">
            <div class="item-details">
              <span class="item-qty">x{{ item.quantity }}</span>
              <span class="item-name">{{ item.product?.name || item.name }}</span>
            </div>
            <span class="item-subtotal">
              {{ ((item.product?.price || item.price || 0) * item.quantity).toLocaleString() }} F
            </span>
          </div>
        </div>

        <!-- Total de la commande -->
        <div class="order-total-section">
          <span>Total :</span>
          <strong>{{ calculateOrderTotal(order.items).toLocaleString() }} FCFA</strong>
        </div>

        <div v-if="order.specialNotes" class="special-notes">
          <strong>Note :</strong> {{ order.specialNotes }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  background-color: #0b0b0b;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #222;
  padding-bottom: 1rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.back-link {
  color: #d4af37;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.history-header h1 {
  font-family: 'Playfair Display', serif;
  color: #d4af37;
  font-size: 1.8rem;
  margin: 0;
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

.order-status-badge {
  background-color: #1e3d2f;
  color: #2ecc71;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: bold;
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

.completion-time {
  font-size: 0.75rem;
  color: #2ecc71;
  margin: 0.2rem 0 0 0;
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

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #222;
  padding-bottom: 0.4rem;
}

.history-item:last-child {
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
</style>
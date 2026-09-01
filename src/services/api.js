export function getProducts() {
  return fetch('/api/products').then(r => r.json());
}

export function getProductById(id) {
  return fetch(`/api/products/${id}`).then(r => r.json());
}

export function createOrder(orderData) {
  return fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  }).then(r => r.json());
}
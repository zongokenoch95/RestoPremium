import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/client/Home.vue'
import Menu from '@/views/client/Menu.vue'
import ProductDetails from '@/views/client/ProductDetails.vue'
import Cart from '@/views/client/Cart.vue'
import OrderConfirmation from '@/views/client/OrderConfirmation.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/confirmation',
    name: 'OrderConfirmation',
    component: OrderConfirmation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

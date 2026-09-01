import { defineStore } from 'pinia'
import { getProducts, getProductById } from '@/services/api'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    products: [],
    currentProduct: null,
    selectedCategory: 'Tous'
  }),
  getters: {
    filteredProducts: (state) => {
      if (state.selectedCategory === 'Tous') {
        return state.products;
      }
      return state.products.filter(p => p.category === state.selectedCategory);
    }
  },
  actions: {
    async fetchProducts() {
      try {
        this.products = await getProducts();
      } catch (error) {
        console.error("Erreur lors du chargement des produits", error);
      }
    },
    async fetchProductById(id) {
      try {
        this.currentProduct = await getProductById(id);
      } catch (error) {
        console.error("Erreur lors du chargement du plat", error);
      }
    },
    setCategory(category) {
      this.selectedCategory = category;
    }
  }
});
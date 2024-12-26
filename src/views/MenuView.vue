<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from '../components/MenuItem.vue'
import database from '../database/database.json'

const categories = ref({})

onMounted(() => {
  categories.value = {
    entrees: database.entrees,
    plats: database.plats,
    desserts: database.desserts,
    boissons_soft: database.boissons_soft,
    vins: database.vins
  }
})

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
const router = useRouter()

const addToCart = (item) => {
  cart.value.push(item)
  localStorage.setItem('cart', JSON.stringify(cart.value))
  alert(`${item.name} a été ajouté au panier`)
}

const goToCart = () => {
  router.push({name: 'cart'})
}

const formatCategoryName = (category) => {
  return category.replace('_', ' ').toUpperCase()
}
</script>

<template>
  <div class="menu">
    <h1 class="restaurant-title">Le restaurant</h1>
    <div class="cart-icon" @click="goToCart">
      <img src="../assets/panier.png" alt="Cart"/>
      <span class="cart-count">{{ cart.length }}</span>
    </div>
    <div v-for="(items, category) in categories" :key="category" class="category">
      <h2>{{ formatCategoryName(category) }}</h2>
      <div class="items">
        <MenuItem v-for="item in items" :key="item.id" :item="item" @add-to-cart="addToCart">
          <template v-if="item.isNew" #badge>
            <span class="badge">Nouveau</span>
          </template>
        </MenuItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  padding: 40px;
  background: url('../assets/restaurant.jpg') no-repeat center center fixed;
  background-size: cover;
  font-family: 'Georgia', serif;
  min-height: 100vh;
  position: relative;
}

.restaurant-title {
  font-size: 3em;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.cart-icon {
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.cart-icon img {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease-in-out;
}

.cart-icon:hover img {
  transform: scale(1.1);
}

.cart-count {
  background-color: #d4af37;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  margin-left: -10px;
  font-size: 0.8em;
  position: absolute;
  top: 0;
  right: 0;
}

.category {
  margin-bottom: 60px;
}

.category h2 {
  font-size: 2em;
  margin-bottom: 30px;
  color: #fff;
  text-transform: uppercase;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

@media (max-width: 768px) {
  .items {
    flex-direction: column;
  }
}

.badge {
  background-color: red;
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8em;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
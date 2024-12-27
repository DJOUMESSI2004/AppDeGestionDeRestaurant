<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
const groupedCart = computed(() => {
  const grouped = {}
  cart.value.forEach(item => {
    if (grouped[item.name]) {
      grouped[item.name].count++
    } else {
      grouped[item.name] = { ...item, count: 1 }
    }
  })
  return Object.values(grouped)
})

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0).toFixed(2)
})

const router = useRouter()

const placeOrder = async () => {
  alert('Order placed successfully!')
  cart.value = []
  localStorage.setItem('cart', JSON.stringify(cart.value))
  await router.push({ name: 'menu' })
}

const removeFromCart = (item) => {
  const index = cart.value.findIndex(cartItem => cartItem.name === item.name)
  if (index !== -1) {
    cart.value.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart.value))
    alert(`${item.name} a été supprimé du panier`)
  }
}

const goBack = () => {
  router.back()
}

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
})
</script>

<template> 
<h1>nicolas</h1>
  <div class="cart">
    <h1>Panier</h1>
    <button class="back-button" @click="goBack">Retour</button>
    <div v-if="groupedCart.length === 0">Votre panier est vide.</div>
    <div v-else>
      <ul>
        <li v-for="item in groupedCart" :key="item.name">
          {{ item.name }} - {{ item.price }}€ x {{ item.count }}
          <button @click="removeFromCart(item)">Supprimer un article</button>
        </li>
      </ul>
      <div class="total">
        <p>Total: {{ totalPrice }}€</p>
        <button @click="placeOrder">Commander</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  padding: 40px;
  font-family: 'Georgia', serif;
  background: url('../assets/restaurant.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  color: #fff;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.total {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #555;
}

.back-button {
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
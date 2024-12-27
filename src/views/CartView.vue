<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useOrdersStore } from '../stores/orders'; // Importation du store des commandes

const cart = ref(JSON.parse(localStorage.getItem('cart')) || []); // Gestion locale du panier
const clientName = ref(''); // Champ pour le nom du client
const groupedCart = computed(() => {
  const grouped = {};
  cart.value.forEach((item) => {
    if (grouped[item.name]) {
      grouped[item.name].count++;
    } else {
      grouped[item.name] = { ...item, count: 1 };
    }
  });
  return Object.values(grouped);
});

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0).toFixed(2);
});

const router = useRouter();
const ordersStore = useOrdersStore(); // Accès au store des commandes

const placeOrder = async () => {
  if (!clientName.value.trim()) {
    alert('Veuillez entrer un nom avant de valider votre commande.');
    return;
  }

  const groupId = Date.now(); // Identifiant unique pour le groupe de commandes
  groupedCart.value.forEach((item) => {
    const order = {
      id: Date.now() + Math.random(), // Génération d'un ID unique
      groupId, // Groupe de commandes
      clientName: clientName.value, // Nom saisi dans le panier
      items: [{ name: item.name, quantity: item.count }],
      status: 'en attente',
    };
    ordersStore.addOrder(order); // Ajout de la commande au store global
  });

  cart.value = []; // Vide le panier après validation
  localStorage.setItem('cart', JSON.stringify(cart.value)); // Mise à jour locale
  clientName.value = ''; // Réinitialise le champ pour le nom
  alert('Commande validée et envoyée à l’administration.');
  await router.push({ name: 'menu' });
};

const removeFromCart = (item) => {
  const index = cart.value.findIndex((cartItem) => cartItem.name === item.name);
  if (index !== -1) {
    cart.value.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart.value));
    alert(`${item.name} a été supprimé du panier`);
  }
};

const goBack = () => {
  router.back();
};

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
});
</script>

<template>
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
      <div class="client-info">
        <label for="clientName">Nom pour la commande :</label>
        <input
          id="clientName"
          type="text"
          v-model="clientName"
          placeholder="Entrez votre nom"
        />
      </div>
      <div class="total">
        <p>Total: {{ totalPrice }}€</p>
        <button @click="placeOrder">Valider la commande</button>
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

.client-info {
  margin-top: 20px;
}

.client-info label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.client-info input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

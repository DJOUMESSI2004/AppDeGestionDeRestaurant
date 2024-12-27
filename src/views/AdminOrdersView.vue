<template>
    <div class="admin-orders">
      <h1>Gestion des Commandes</h1>
      <button class="back-button" @click="goBack">Retour</button>
      <div v-if="orders.length > 0">
        <ul>
          <li v-for="order in orders" :key="order.id">
            <div class="order-header">
              <p><strong>Client :</strong> {{ order.clientName }}</p>
              <p><strong>Statut :</strong> {{ order.status }}</p>
            </div>
            <div>
              <p><strong>Plats :</strong></p>
              <ul class="items">
                <li v-for="item in order.items" :key="item.name">
                  {{ item.name }} - {{ item.quantity }}x
                </li>
              </ul>
            </div>
            <div class="order-actions">
              <button @click="markAsReady(order.id)" :disabled="order.status === 'prête'">
                {{ order.status === 'prête' ? 'Commande prête' : 'Marquer comme prête' }}
              </button>
              <button @click="deleteOrder(order.id)" class="delete-btn">Supprimer la commande</button>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>Aucune commande disponible pour le moment.</p>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useOrdersStore } from '../stores/orders';
  
  export default {
    name: 'AdminOrdersView',
    setup() {
      const ordersStore = useOrdersStore();
      const orders = computed(() => ordersStore.orders);
  
      const markAsReady = (id) => {
        const order = orders.value.find((order) => order.id === id);
        if (order) {
          order.status = 'prête';
          console.log(`Commande ${id} marquée comme prête.`);
        }
      };
  
      const deleteOrder = (id) => {
        ordersStore.removeOrder(id);
        console.log(`Commande ${id} supprimée.`);
      };
  
      const goBack = () => {
        window.history.back();
      };
  
      return { orders, markAsReady, deleteOrder, goBack };
    },
  };
  </script>
  
  <style scoped>
  .admin-orders {
    padding: 40px;
    font-family: 'Georgia', serif;
    background: url('../assets/restaurant.jpg') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    color: #fff;
  }
  
  h1 {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .back-button {
    margin-bottom: 20px;
    display: block;
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease-in-out;
  }
  
  .back-button:hover {
    background-color: #45a049;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .items {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  .order-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #555;
  }
  
  button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
  
  .delete-btn {
    background-color: #f44336;
  }
  
  .delete-btn:hover {
    background-color: #e53935;
  }
  </style>
  
import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [], // Liste des commandes
  }),
  actions: {
    addOrder(order) {
      this.orders.push(order);
    },
    removeOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
  },
});

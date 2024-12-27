<script setup>
import { defineProps, defineEmits } from 'vue'

//création des props et des emits pour le composant MenuItem
const props = defineProps({
  item: Object
})

const emits = defineEmits(['add-to-cart']) //ajout de l'emit add-to-cart

//fonction pour ajouter un item au panier
const addToCart = () => {
  emits('add-to-cart', props.item)
}
</script>

<template>
  <div class="menu-item">
    <img :src="item.image_url" :alt="item.name"/>
    <div class="info">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p>{{ item.price }}€</p>
      <slot name="badge"></slot>
      <button @click="addToCart">Ajouter au panier</button>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  position: relative;
  width: 300px;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
}

.menu-item:hover {
  transform: translateY(-10px);
}

.menu-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-item .info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  text-align: center;
}

.menu-item h3 {
  font-size: 1.2em;
  margin: 5px 0;
}

.menu-item p {
  margin: 5px 0;
}

.menu-item button {
  padding: 5px 10px;
  font-size: 0.9em;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.menu-item button:hover {
  background-color: #555;
}
</style>
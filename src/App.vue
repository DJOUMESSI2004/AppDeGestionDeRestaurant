<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <ul>
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><RouterLink to="/menu">Menu</RouterLink></li>
        <li><RouterLink to="/cart">Panier</RouterLink></li>
        <li><RouterLink to="/admin">Administration</RouterLink></li>
      </ul>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  padding: 10px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 15px;
}

nav ul li {
  display: inline;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

//definition des variables
const welcome = ref('Bienvenue dans notre restaurant')
const description = ref('Venez découvrir nos plats du jour 😋')
</script>

<template>
  <header class="hero">
        <div class="hero-content">
            <h1 class="hero-title">{{ welcome }}</h1>
            <p class="hero-subtitle">{{ description }}</p>
            <RouterLink to="/menu" class="hero-button green">Voir le menu</RouterLink>
        </div>
    </header>
</template>

<style scoped>
.hero {
    position: relative;
    background: url('../assets/restaurant.jpg') center/cover no-repeat;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); 
    z-index: 1; 
}

.hero-content {
    text-align: center;
    color: #fff;
    z-index: 2; 
}

.hero-title {
    font-size: 3em;
    margin-bottom: 20px;
}

.hero-subtitle {
    font-size: 1.5em;
    margin-bottom: 30px;
}

.hero-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1.2em;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
}
</style>

# Documentation du projet Vue.js

## Structure du Projet

Le projet est construit avec Vue.js et utilise les composants suivants :

- *main.js* : Fichier principal pour initialiser l'application Vue.
- *App.vue* : Composant principal avec la vue routeur.
- *MenuView.vue* : Vue du menu principal pour afficher les plats disponibles.
- *HomeView.vue* : Page d'accueil avec une description de bienvenue.
- *CartView.vue* : Vue du panier pour gérer les articles ajoutés.
- *router/index.js* : Configuration des routes de l'application.
- *components/MenuItem.vue* : Composant pour afficher un article du menu.
- *database/database.json* : Fichier de base de données contenant les informations des plats.

---

## main.js

### Description

Fichier principal qui initialise Vue.js et monte l'application sur l'élément DOM avec l'id #app.

javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');


---

## App.vue

### Description

Composant racine qui contient le routeur.

vue
<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>


---

## MenuView.vue

### Description

Affiche les catégories d'articles (entrées, plats, desserts, etc.) avec des options pour ajouter des articles au panier.

#### Principales Fonctions :

- *categories* : Référence réactive des catégories de plats.
- *cart* : Panier des articles sauvegardé dans localStorage.
- *addToCart* : Ajoute un article au panier.
- *goToCart* : Redirige vers la vue panier.
- *formatCategoryName* : Formate les noms des catégories.

vue
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MenuItem from '../components/MenuItem.vue';
import database from '../database/database.json';

const categories = ref({});
const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
const router = useRouter();

onMounted(() => {
  categories.value = {
    entrees: database.entrees,
    plats: database.plats,
    desserts: database.desserts,
    boissons_soft: database.boissons_soft,
    vins: database.vins,
  };
});

const addToCart = (item) => {
  cart.value.push(item);
  localStorage.setItem('cart', JSON.stringify(cart.value));
  alert(`${item.name} a été ajouté au panier`);
};

const goToCart = () => {
  router.push({ name: 'cart' });
};

const formatCategoryName = (category) => {
  return category.replace('_', ' ').toUpperCase();
};
</script>


---

## HomeView.vue
### Description
Page d'accueil avec un message de bienvenue et un bouton pour afficher le menu.

vue
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const welcome = ref('Bienvenue dans notre restaurant');
const description = ref('Venez découvrir nos plats du jour 😋');
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


---

## CartView.vue
### Description
Permet de consulter et de modifier les articles du panier.

#### Principales Fonctions :
- *groupedCart* : Regroupe les articles similaires dans le panier.
- *totalPrice* : Calcule le prix total des articles.
- *placeOrder* : Vide le panier et redirige vers le menu.
- *removeFromCart* : Supprime un article du panier.
- *goBack* : Retourne à la page précédente.

vue
<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);

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

const placeOrder = async () => {
  alert('Order placed successfully!');
  cart.value = [];
  localStorage.setItem('cart', JSON.stringify(cart.value));
  await router.push({ name: 'menu' });
};

const removeFromCart = (item) => {
  const index = cart.value.findIndex(
    (cartItem) => cartItem.name === item.name
  );
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


---

## Router Configuration
### Description
Configure les routes pour l'application.

javascript
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MenuView from '../views/MenuView.vue';
import CartView from '../views/CartView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/menu', name: 'menu', component: MenuView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  ],
});

export default router;


---

## MenuItem.vue
### Description
Composant pour afficher un plat individuel dans le menu.

vue
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({ item: Object });
const emits = defineEmits(['add-to-cart']);

const addToCart = () => {
  emits('add-to-cart', props.item);
};
</script>

<template>
  <div class="menu-item">
    <img :src="item.image_url" :alt="item.name" />
    <div class="info">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p>{{ item.price }}€</p>
      <slot name="badge"></slot>
      <button @click="addToCart">Ajouter au panier</button>
    </div>
  </div>
</template>

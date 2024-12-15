# Vue.js 3 : Gestion d’un Restaurant en Ligne

## Objectif
Créer une application pour gérer un restaurant en ligne. Travaillez en groupes de 4 pour développer les fonctionnalités, en mettant en œuvre les concepts présentés durant le cours Vue.js 3.

## Scénario
Un restaurant souhaite une application pour afficher son menu, permettre aux utilisateurs de créer leur commande, et gérer la liste des commandes en cours.

## Fonctionnalités demandées

1. **Page d’accueil** :
   - Afficher le nom et une description du restaurant.
   - Bouton pour accéder au menu.

2. **Page "Menu"** :
   - Liste des plats avec un bouton "Ajouter au panier".
   - Afficher une alerte (ou un toast) lorsqu’un plat est ajouté au panier.

3. **Panier** :
   - Afficher les plats ajoutés avec leurs quantités et le total.
   - Permettre de modifier la quantité ou de supprimer un plat.
   - Bouton pour finaliser la commande.

4. **Gestion des commandes (admin)** :
   - Page listant les commandes (nom de client, détails des plats commandés).
   - Bouton pour marquer une commande comme "prête".

---

## Répartition des tâches

1. **Gestion du menu**
   - Création de la liste des plats (utilisation de props et slots pour afficher les informations).
   - Ajout d’un plat au panier (event emitters et watchers).

2. **Gestion du panier**
   - Afficher les plats ajoutés avec leur quantité.
   - Utilisation de watchers pour calculer le total du panier.

3. **Gestion des commandes (admin)**
   - Page listant toutes les commandes (utilisation de Vue Router pour la navigation).
   - Provide/Inject pour partager les commandes avec d’autres composants.

4. **Interaction utilisateur**
   - Création d’une alerte ou d’un toast lors de l’ajout d’un plat au panier.
   - Gestion des transitions entre les pages avec Vue Router.

5. **Structure générale et logique**
   - Mise en place des routes principales avec Vue Router.
   - Gestion du state partagé entre les composants avec provide/inject.

---

## Critères de notation

- L’app doit être fonctionnelle.
- Le code doit être clair : convention de nommage, commentaires, indentation.

---

## Critères techniques

1. **Directives de base** :
   - Utilisation de `v-for` pour afficher la liste des plats et des commandes.
   - Utilisation de `v-if`, `v-else`, et `v-bind` pour conditionnellement afficher certains éléments.

2. **Components et props** :
   - Décomposer l’application en composants réutilisables (par exemple, `PlatItem`, `PanierItem`).
   - Passer les données des plats et des commandes via les props.

3. **Events** :
   - Émission d’événements pour ajouter au panier ou marquer une commande comme "prête".

4. **Slots** :
   - Utilisation de slots pour personnaliser l’affichage des plats (par exemple, un badge "Nouveau" sur certains plats).

5. **Watchers** :
   - Surveiller les modifications dans le panier pour mettre à jour le total dynamiquement.

6. **Lifecycle hooks** :
   - Utilisation de hooks comme `mounted` pour initialiser les données.

7. **Provide/Inject** :
   - Partager les données de commandes entre les composants sans passer par une cascade de props.

8. **Vue Router** :
   - Navigation entre la page d’accueil, la page du menu, le panier et la gestion des commandes.

---

## Livrables

- Code fonctionnel de l’application.
- Document court de présentation du projet et des concepts de Vue.js utilisés.

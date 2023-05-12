<script setup>
import CardComponent from '../components/CardComponent.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <main>
    <CardComponent/>
    <RouterView></RouterView>
  </main>
</template>

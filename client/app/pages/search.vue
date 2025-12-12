<script setup lang="ts">
  const { data: clothes, error, pending } = await useFetch('http://127.0.0.1:8090/api/collections/clothes/records')
</script>

<template>
  <div class="container mx-auto px-4 max-w-5xl">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="clothes" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AppStoreCard 
        v-for="item in clothes.items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>
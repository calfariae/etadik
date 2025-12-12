<template>
  <div>
    <NuxtLink :to="`/items/${item.id}`" class="block m-2">
      <div class="bg-red-600 shadow-xs flex flex-col overflow-hidden relative">
        <!-- Stock badge on image -->
        <div class="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-xs font-semibold z-10">
          {{ item.stock || 0 }} in stock
        </div>
        
        <div class="w-full h-48 overflow-hidden">
          <img 
            :src="imageUrl" 
            :alt="item.name" 
            class="w-full h-full object-cover object-top"
          />
        </div>
        <div class="p-6 text-left">
          <p class="mb-4 text-2xl font-semibold text-white">{{ item.name }}</p>
          <p class="text-white">{{ formattedPrice }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

// Generate the full image URL from PocketBase
const imageUrl = computed(() => {
  if (props.item.image && props.item.image.length > 0) {
    const filename = props.item.image[0]
    return `http://127.0.0.1:8090/api/files/${props.item.collectionId}/${props.item.id}/${filename}`
  }
  return '/assets/images/clothes.png' // fallback image
})

// Format price with Indonesian Rupiah formatting
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(props.item.price)
})
</script>
<template>
  <div class="py-8 bg-white md:py-16 antialiased min-h-dvh">
    <div v-if="pending" class="max-w-screen-xl px-4 mx-auto text-center">
      <p class="text-lg">Loading...</p>
    </div>
    
    <div v-else-if="error" class="max-w-screen-xl px-4 mx-auto text-center">
      <p class="text-lg text-red-600">Error: {{ error.message }}</p>
    </div>
    
    <div v-else-if="item" class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <div class="w-full h-96 overflow-hidden">
            <img
              class="w-full h-full object-cover object-top"
              :src="imageUrl"
              :alt="item.name"
            />
          </div>
        </div>
        <AppStoreDesc :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

// Fetch the specific item
const { data: item, error, pending } = await useFetch(`http://127.0.0.1:8090/api/collections/clothes/records/${id}`)

// Generate the full image URL
const imageUrl = computed(() => {
  if (item.value && item.value.image && item.value.image.length > 0) {
    const filename = item.value.image[0]
    return `http://127.0.0.1:8090/api/files/${item.value.collectionId}/${item.value.id}/${filename}`
  }
  return '/assets/images/clothes.png' // fallback image
})

// Format price
const formattedPrice = computed(() => {
  if (item.value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(item.value.price)
  }
  return ''
})
</script>
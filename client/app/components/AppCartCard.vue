<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['item-removed', 'item-updated'])

const quantity = ref(props.item.quantity)
const isUpdating = ref(false)

// Generate image URL
const imageUrl = computed(() => {
  if (props.item.image && props.item.image.length > 0) {
    return `http://127.0.0.1:8090/api/files/${props.item.collectionId}/${props.item.id}/${props.item.image[0]}`
  }
  return '/assets/images/clothes.png'
})

// Format price
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(props.item.price)
})

const totalPrice = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(props.item.price * quantity.value)
})

// Update quantity
const updateQuantity = async (newQuantity) => {
  // Validate against stock
  if (newQuantity > props.item.stock) {
    alert(`Only ${props.item.stock} items available in stock`)
    return
  }

  if (newQuantity < 1) {
    return
  }

  isUpdating.value = true
  try {
    await $fetch(`http://127.0.0.1:8090/api/collections/cart/records/${props.item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: newQuantity
      })
    })
    quantity.value = newQuantity
    emit('item-updated')
  } catch (error) {
    console.error('Failed to update quantity:', error)
    alert('Failed to update quantity')
  } finally {
    isUpdating.value = false
  }
}

const increaseQuantity = () => {
  updateQuantity(quantity.value + 1)
}

const decreaseQuantity = () => {
  updateQuantity(quantity.value - 1)
}

// Remove item from cart
const removeItem = async () => {
  try {
    await $fetch(`http://127.0.0.1:8090/api/collections/cart/records/${props.item.id}`, {
      method: 'DELETE'
    })
    emit('item-removed')
  } catch (error) {
    console.error('Failed to remove item:', error)
  }
}
</script>

<template>
  <div class="rounded-lg border border-red-600 border-2 bg-white p-4 shadow-sm md:p-6">
    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
      <!-- Image -->
      <NuxtLink :to="`/items/${item.id}`" class="shrink-0 md:order-1">
        <img class="h-20 w-20 object-cover rounded" :src="imageUrl" :alt="item.name" />
      </NuxtLink>

      <!-- Price -->
      <div class="flex items-center justify-between md:order-3 md:justify-end">
        <div class="flex items-center">
          <p class="text-base font-bold text-gray-900">
            {{ totalPrice }}
          </p>
        </div>
      </div>

      <!-- Details -->
      <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
        <NuxtLink :to="`/items/${item.id}`" class="text-base font-medium text-gray-900 hover:underline">
          {{ item.name }}
        </NuxtLink>

        <!-- Quantity Controls -->
        <div class="flex items-center gap-4">
          <div class="flex items-center border border-gray-300 rounded">
            <button
              @click="decreaseQuantity"
              :disabled="quantity <= 1 || isUpdating"
              class="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span class="px-4 py-1 border-x border-gray-300 min-w-[40px] text-center">
              {{ quantity }}
            </span>
            <button
              @click="increaseQuantity"
              :disabled="quantity >= item.stock || isUpdating"
              class="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          <p class="text-sm text-gray-500">
            Stock: {{ item.stock }}
          </p>
        </div>

        <!-- Remove Button -->
        <div class="flex items-center gap-4">
          <button
            @click="removeItem"
            type="button"
            class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
          >
            <svg class="me-1.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
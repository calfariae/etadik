<script setup lang="ts">
  const { data: cartData, error, pending, refresh } = await useFetch('http://127.0.0.1:8090/api/collections/cart/records')

  const onItemUpdated = () => {
    refresh()
  }

  // Calculate totals
  const originalPrice = computed(() => {
    if (!cartData.value?.items) return 0
    return cartData.value.items.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  const savings = computed(() => {
    // Calculate savings if you have a discount field
    if (!cartData.value?.items) return 0
    return cartData.value.items.reduce((total, item) => {
      return total + ((item.originalPrice || item.price) - item.price) * item.quantity
    }, 0)
  })

  const storePickup = ref(0) // Set your pickup fee
  const tax = computed(() => originalPrice.value * 0.11) // 11% tax

  const total = computed(() => {
    return originalPrice.value - savings.value + storePickup.value + tax.value
  })

  // Format price
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Handle cart item removal
  const onItemRemoved = () => {
    refresh()
  }
</script>

<template>
  <section class="py-8 antialiased md:py-16">
    <div class="mx-auto max-w-7xl px-4 2xl:px-0">
      <h1 class="text-xl font-semibold text-black sm:text-2xl">
        Shopping Cart
      </h1>

      <div v-if="pending" class="mt-8 text-center">
        <p class="text-lg">Loading cart...</p>
      </div>

      <div v-else-if="error" class="mt-8 text-center">
        <p class="text-lg text-red-600">Error loading cart: {{ error.message }}</p>
      </div>

      <div v-else-if="!cartData?.items?.length" class="mt-8 text-center py-12">
        <p class="text-lg text-gray-500 mb-4">Your cart is empty</p>
        <NuxtLink 
          to="/explore" 
          class="inline-flex items-center gap-2 text-red-600 hover:underline font-medium"
        >
          Continue Shopping
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
          </svg>
        </NuxtLink>
      </div>

      <div v-else class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <!-- Cart Items -->
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div class="space-y-6">
            <AppCartCard 
              v-for="item in cartData.items" 
              :key="item.id"
              :item="item"
              @item-removed="onItemRemoved"
              @item-updated="onItemUpdated"
            />
          </div>
        </div>

        <!-- Order Summary -->
        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div class="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm bg-red-600 sm:p-6">
            <p class="text-xl font-semibold text-white">
              Order summary
            </p>

            <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-white">
                    Original price
                  </dt>
                  <dd class="text-base font-medium text-white">
                    {{ formatPrice(originalPrice) }}
                  </dd>
                </dl>

                <dl v-if="savings > 0" class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-white">
                    Savings
                  </dt>
                  <dd class="text-base font-medium text-green-300">
                    -{{ formatPrice(savings) }}
                  </dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-white">
                    Store Pickup
                  </dt>
                  <dd class="text-base font-medium text-white">
                    {{ formatPrice(storePickup) }}
                  </dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-white">
                    Tax (11%)
                  </dt>
                  <dd class="text-base font-medium text-white">
                    {{ formatPrice(tax) }}
                  </dd>
                </dl>
              </div>

              <dl class="flex items-center justify-between gap-4 border-t border-white pt-2">
                <dt class="text-base font-bold text-white">
                  Total
                </dt>
                <dd class="text-base font-bold text-white">
                  {{ formatPrice(total) }}
                </dd>
              </dl>
            </div>

            <button
              class="flex w-full items-center justify-center rounded-lg bg-white text-red-600 px-5 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Proceed to Checkout
            </button>

            <div class="flex items-center justify-center gap-2">
              <span class="text-sm font-normal text-white">
                or
              </span>
              <NuxtLink
                to="/explore"
                class="inline-flex items-center gap-2 text-sm font-medium text-white underline hover:no-underline"
              >
                Continue Shopping
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
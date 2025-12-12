<template>
  <div class="mt-6 sm:mt-8 lg:mt-0">
    <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
      {{ item.name }}
    </h1>
    
    <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
      <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
        {{ formattedPrice }}
      </p>

      <div class="flex items-center gap-2 mt-2 sm:mt-0">
        <div class="flex items-center gap-1">
          <svg
            v-for="star in 5"
            :key="star"
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
            />
          </svg>
        </div>
        <p class="text-sm font-medium leading-none text-gray-500">
          (5.0)
        </p>
        <a
          href="#"
          class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
        >
          345 Reviews
        </a>
      </div>
    </div>

    <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
      <button
        @click="addToFavorites"
        class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
      >
        <svg
          class="w-5 h-5 -ms-2 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
        Add to favorites
      </button>

      <button
        @click="addToCart"
        class="text-white mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center transition-colors"
      >
        <svg
          class="w-5 h-5 -ms-2 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>
        Add to cart
      </button>
    </div>

    <hr class="my-6 md:my-8 border-black" />

    <p class="mb-6 text-black font-semibold">
      {{ item.description }}
    </p>

    <p class="text-black">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Provident earum quibusdam id dolorem fuga! Quas, consequatur,
      impedit modi minima officia omnis assumenda praesentium,
      quisquam pariatur harum cumque nam maxime odit.
    </p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })

  // Format price
  const formattedPrice = computed(() => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(props.item.price)
  })

  // Placeholder functions for cart/favorites
  const addToFavorites = () => {
    console.log('Added to favorites:', props.item.id)
    // Add your favorites logic here
  }

  const addToCart = () => {
    console.log('Added to cart:', props.item.id)
    // Add your cart logic here
  }
</script>
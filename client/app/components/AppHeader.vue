<script setup>
const route = useRoute()
const router = useRouter()
const mobileMenuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    // Focus the input after it's rendered
    nextTick(() => {
      document.getElementById('search-input')?.focus()
    })
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    searchOpen.value = false
    searchQuery.value = ''
  }
}
</script>

<template>
  <header class="flex justify-between items-center py-4 px-4 md:px-8 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-white">
    <!-- Logo -->
    <NuxtLink to="/" class="flex place-content-center" @click="closeMenu">
      <img src="/assets/icons/logo.svg" alt="logo" class="h-8" />
    </NuxtLink>

    <!-- Desktop Navigation -->
    <nav class="gap-4 hidden md:flex">
      <NuxtLink 
        to="/explore" 
        class="place-content-center transition-all"
        :class="{ 'font-bold underline underline-offset-4': isActive('/explore') }"
      >
        EXPLORE
      </NuxtLink>
      <NuxtLink 
        to="/clothes" 
        class="place-content-center transition-all"
        :class="{ 'font-bold underline underline-offset-4': isActive('/clothes') }"
      >
        CLOTHES
      </NuxtLink>
      <NuxtLink 
        to="/antiques" 
        class="place-content-center transition-all"
        :class="{ 'font-bold underline underline-offset-4': isActive('/antiques') }"
      >
        ANTIQUES
      </NuxtLink>
    </nav>

    <!-- Desktop Icons -->
    <div class="gap-4 hidden md:flex items-center">
      <button @click="toggleSearch" class="flex place-content-center">
        <img src="/assets/icons/search.svg" alt="search" class="w-6 h-6" />
      </button>
      <NuxtLink to="/cart" class="flex place-content-center">
        <img src="/assets/icons/cart.svg" alt="cart" class="w-6 h-6" />
      </NuxtLink>
      <NuxtLink to="/profile" class="flex place-content-center">
        <img src="/assets/icons/profile.svg" alt="profile" class="w-6 h-6" />
      </NuxtLink>
    </div>

    <!-- Mobile Menu Button -->
    <button 
      @click="toggleMenu"
      class="md:hidden flex flex-col gap-1.5 p-2"
      aria-label="Toggle menu"
    >
      <span 
        class="w-6 h-0.5 bg-black transition-all"
        :class="{ 'rotate-45 translate-y-2': mobileMenuOpen }"
      ></span>
      <span 
        class="w-6 h-0.5 bg-black transition-all"
        :class="{ 'opacity-0': mobileMenuOpen }"
      ></span>
      <span 
        class="w-6 h-0.5 bg-black transition-all"
        :class="{ '-rotate-45 -translate-y-2': mobileMenuOpen }"
      ></span>
    </button>

    <!-- Search Bar (Desktop & Mobile) -->
    <div 
      v-if="searchOpen"
      class="absolute top-full left-0 right-0 bg-white shadow-lg p-4 z-40"
    >
      <form @submit.prevent="handleSearch" class="max-w-2xl mx-auto flex gap-2">
        <input
          id="search-input"
          v-model="searchQuery"
          type="text"
          placeholder="Search for batik, antiques..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          type="submit"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Search
        </button>
        <button
          type="button"
          @click="toggleSearch"
          class="text-gray-500 hover:text-gray-700 px-4"
        >
          Cancel
        </button>
      </form>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen"
      class="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden"
    >
      <nav class="flex flex-col p-4">
        <NuxtLink 
          to="/explore" 
          class="py-3 px-4 transition-all hover:bg-gray-100"
          :class="{ 'font-bold underline underline-offset-4': isActive('/explore') }"
          @click="closeMenu"
        >
          EXPLORE
        </NuxtLink>
        <NuxtLink 
          to="/clothes" 
          class="py-3 px-4 transition-all hover:bg-gray-100"
          :class="{ 'font-bold underline underline-offset-4': isActive('/clothes') }"
          @click="closeMenu"
        >
          CLOTHES
        </NuxtLink>
        <NuxtLink 
          to="/antiques" 
          class="py-3 px-4 transition-all hover:bg-gray-100"
          :class="{ 'font-bold underline underline-offset-4': isActive('/antiques') }"
          @click="closeMenu"
        >
          ANTIQUES
        </NuxtLink>
        
        <hr class="my-2 border-gray-200" />
        
        <div class="flex gap-6 py-3 px-4">
          <button @click="toggleSearch(); closeMenu()" class="flex place-content-center">
            <img src="/assets/icons/search.svg" alt="search" class="w-6 h-6" />
          </button>
          <NuxtLink to="/cart" class="flex place-content-center" @click="closeMenu">
            <img src="/assets/icons/cart.svg" alt="cart" class="w-6 h-6" />
          </NuxtLink>
          <NuxtLink to="/login" class="flex place-content-center" @click="closeMenu">
            <img src="/assets/icons/profile.svg" alt="profile" class="w-6 h-6" />
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>
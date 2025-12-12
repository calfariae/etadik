<script setup>
// Dummy user data
const user = ref({
  id: '1',
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  created: '2024-01-15T10:00:00.000Z',
  avatar: null
})

const isEditing = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Form data
const formData = ref({
  name: user.value.name,
  email: user.value.email,
  username: user.value.username
})

// Toggle edit mode
const toggleEdit = () => {
  isEditing.value = !isEditing.value
  if (!isEditing.value) {
    // Reset form data if canceling
    formData.value = {
      name: user.value.name,
      email: user.value.email,
      username: user.value.username
    }
  }
}

// Save profile changes
const saveProfile = () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSaving.value = true

  // Simulate API call
  setTimeout(() => {
    user.value = {
      ...user.value,
      ...formData.value
    }
    
    successMessage.value = 'Profile updated successfully!'
    isEditing.value = false
    isSaving.value = false

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }, 1000)
}

// Handle logout
const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    navigateTo('/login')
  }
}

// Get user initials for avatar
const getUserInitials = computed(() => {
  if (user.value?.name) {
    return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }
  return user.value?.email?.[0]?.toUpperCase() || 'U'
})
</script>

<template>
  <section class="py-8 antialiased md:py-16">
    <div class="mx-auto max-w-4xl px-4 2xl:px-0">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Profile</h1>
        <p class="text-gray-600 mt-2">Manage your account information</p>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ successMessage }}</span>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ errorMessage }}</span>
      </div>

      <!-- Profile Card -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Avatar Section -->
        <div class="bg-red-600 px-6 py-8">
          <div class="flex items-center gap-6">
            <div class="w-24 h-24 rounded-full bg-white flex items-center justify-center text-red-600 text-3xl font-bold">
              {{ getUserInitials }}
            </div>
            <div class="text-white">
              <h2 class="text-2xl font-bold">{{ user.name }}</h2>
              <p class="text-red-100">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Account Information</h3>
            <button
              v-if="!isEditing"
              @click="toggleEdit"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <form @submit.prevent="saveProfile" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                v-if="isEditing"
                v-model="formData.name"
                type="text"
                id="name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <p v-else class="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                {{ user.name }}
              </p>
            </div>

            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                v-if="isEditing"
                v-model="formData.username"
                type="text"
                id="username"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <p v-else class="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                {{ user.username }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                v-if="isEditing"
                v-model="formData.email"
                type="email"
                id="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <p v-else class="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                {{ user.email }}
              </p>
            </div>

            <!-- Action Buttons (only show when editing) -->
            <div v-if="isEditing" class="flex gap-4 pt-4">
              <button
                type="submit"
                :disabled="isSaving"
                class="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSaving">Saving...</span>
                <span v-else>Save Changes</span>
              </button>
              <button
                type="button"
                @click="toggleEdit"
                :disabled="isSaving"
                class="flex-1 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Account Actions -->
        <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/cart"
              class="flex-1 px-6 py-3 text-center bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              My Cart
            </NuxtLink>
            <button
              @click="handleLogout"
              class="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Account Stats -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Member since</span>
              <span class="font-medium">{{ new Date(user.created).toLocaleDateString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Orders</span>
              <span class="font-medium">12</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Items in Cart</span>
              <span class="font-medium">3</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div class="space-y-2">
            <NuxtLink to="/explore" class="block text-red-600 hover:underline">
              Browse Products
            </NuxtLink>
            <NuxtLink to="/cart" class="block text-red-600 hover:underline">
              View Cart
            </NuxtLink>
            <NuxtLink to="/" class="block text-red-600 hover:underline">
              Back to Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
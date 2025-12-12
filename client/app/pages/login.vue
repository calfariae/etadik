<script setup>
  const router = useRouter()

  // Form data
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const isLoading = ref(false)
  const errorMessage = ref('')

  // Handle login
  const handleLogin = async () => {
    errorMessage.value = ''
    
    // Basic validation
    if (!email.value || !password.value) {
      errorMessage.value = 'Please fill in all fields'
      return
    }

    isLoading.value = true

    try {
      const response = await $fetch('http://127.0.0.1:8090/api/collections/users/auth-with-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identity: email.value,
          password: password.value
        })
      })

      // Store auth token (you might want to use a composable or store for this)
      if (rememberMe.value) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.record))
      } else {
        sessionStorage.setItem('authToken', response.token)
        sessionStorage.setItem('user', JSON.stringify(response.record))
      }

      // Redirect to home or dashboard
      router.push('/profile')
    } catch (error) {
      console.error('Login failed:', error)
      errorMessage.value = error.data?.message || 'Invalid email or password'
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <section class="">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-red-600 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
            Sign in to your account
          </h1>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span class="block sm:inline">{{ errorMessage }}</span>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-white">
                Your email
              </label>
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 text-black rounded-lg block w-full p-2.5 placeholder:text-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-white">
                Password
              </label>
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 text-black rounded-lg block w-full p-2.5 placeholder:text-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    v-model="rememberMe"
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-white"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-white">Remember me</label>
                </div>
              </div>
              <NuxtLink to="/forgot-password" class="text-sm font-medium text-white hover:underline">
                Forgot password?
              </NuxtLink>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full text-red-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>

            <p class="text-sm font-light text-white">
              Don't have an account yet?
              <NuxtLink to="/signup" class="font-medium text-white hover:underline underline">
                Sign up
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<template>
  <div class="h-dvh p-4">
    <div class="relative h-full">
      <img
        src="/assets/images/landing.png"
        alt="landing"
        class="w-full h-full object-cover rounded-xl"
      />
      <div class="absolute inset-0 bg-black/60 rounded-xl text-white">
        <div class="mt-16 ml-8">
          <h1 class="text-5xl font-bold mb-2">WELCOME TO ETADIK!</h1>
          <p class="pb-4">Temukan segala macam batik dan antik mulai dari pagkaian hingga lemari</p>
          <NuxtLink 
            to="/explore" 
            class="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Explore
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
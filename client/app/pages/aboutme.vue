<script lang="ts">
  // const { data: myData, error, pending, refresh } = await useFetch('http://127.0.0.1:8090/api/collections/me/records/98np0iuhii8c4la')\
  let manyFoods: [
        'Burrito',
        'Salad',
        'Cake',
        'Soup',
        'Fish',
        'Pizza',
        'Rice'
      ]
</script>

<template>
  <div class="container mx-auto px-4 max-w-7xl grid grid-cols-2">
    <div>
      <h1 class="text-4xl font-bold">Christian Alfa Romeo Lontoh</h1>
      <h2 class="text-xl mb-5">11221059 - Informatika - Institut Teknologi Kalimantan</h2>
      <p>Salam kenal, nama saya Christian Alfa Romeo dengan NIM 11221059, saya
        biasa dipanggil Alfa. Saya lahir di Balikpapan pada tanggal 14 Juni 2005, saya anak
        kedua dari empat bersaudara. Saya menempuh Pendidikan SD hingga SMA saya di
        Yayasan Pendidikan Advent Balikpapan dan sekarang saya merupakan mahasiswa
        program studi Informatika Angkatan 2022 di Institut Teknologi Kalimantan. Melalui
        surat motivasi ini, dengan kerendahan hati saya ingin mengajukan diri sebagai kakak
        pendamping Himpunan Mahasiswa Informatika.
      </p>
    </div>
    <div class="invisible sm:visible ml-50">
      <img src="/assets/images/profile.jpg" class="h-98" alt="profile image">
    </div>
  </div>
  
  <div>
    <AppSkillCard
        v-for="x in manyFoods"
      />
  </div>
</template>

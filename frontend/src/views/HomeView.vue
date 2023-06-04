<script setup>
import Mood from '../components/Mood.vue';

import { ref, onMounted } from 'vue'
import axios from 'axios'

let moods = ref([])

async function getMoods() {
  const { data } = await axios.get('http://localhost:3000/moods')
  moods.value = data;
}

onMounted(() => {
  getMoods();
})

</script>
<template>
  <main>
    <div class="ticker-wrapper  position-relative bg-dark d-flex mb-8">
      <div class="ticker-area">
        <div class=" ticker-item text-h1 text-white mb-4 me-9" v-for="x in 8" :key="x">
          Choose Your Mood!
        </div>
      </div>
    </div>
    <v-container>
      <v-row>
        <v-col v-for="(mood, index) in moods" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
          <Mood :mood="mood"> </Mood>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>



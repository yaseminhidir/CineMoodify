
<script setup>
import TheMovie from '../components/TheMovie.vue';
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(["mood"]);
const mood = props.mood;

let movies = ref([])
const dialog = ref(false)
const loading = ref(false)

async function submitMood() {
  loading.value = true
  const { data } = await axios.post('http://localhost:3000/getRecommendation', {
    mood
  })
  movies = data.result;
  loading.value = false
  dialog.value = true
}
</script>


<template>
  <v-btn color="pink-lighten-5 mood-btn font-weight-bold" elevation="5" class="w-100 py-4 text-h6" rounded
    @click="submitMood">
    {{ mood }}
  </v-btn>
  <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ mood }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-row justify="space-around">
          <v-col v-for="(movie, index) in movies" :key="index" cols="12" sm="6" lg="4" xl="3">
            <TheMovie :movie="movie"></TheMovie>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog v-model="loading" persistent>
    <v-progress-linear indeterminate height="10" striped color="primary" style="width:50vw"></v-progress-linear>
  </v-dialog>
</template>

<style scoped></style>
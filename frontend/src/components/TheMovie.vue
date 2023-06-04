<script setup>
const props = defineProps(["movie"]);

const movie = props.movie
console.log(movie)
</script>

<template>
  
    <v-card width="400" class="movie-card border-0">
        <v-img height="650" :src="movie.poster_path" cover
            class="text-white movie-img">
        </v-img>
        <v-card-text>
            <div class="font-weight-bold ms-1 mb-2 movie-title">
               <h2>{{ movie.title }}</h2> 
            </div>

            <v-timeline density="compact" align="start">
                <v-timeline-item   size="x-small" dot-color="deep-purple-lighten-1">
                    <div class="mb-4">
                        <div class="font-weight-normal" >
                            <strong></strong> 
                        </div>
                       {{movie.release_date}}
                    </div>
                </v-timeline-item>
                <v-timeline-item   size="x-small" dot-color="green">
                    <div class="mb-4">
                        <div class="font-weight-light">
                            <strong>{{ movie.overview }}</strong> 
                        </div>
                    </div>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>
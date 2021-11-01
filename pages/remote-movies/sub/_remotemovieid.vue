<template>
<div class="single-remote">
  <!-- Movie Info -->
  <div class="single-movie container">
    <NuxtLink class="button" :to="{ name: 'remote-movies' }"> Back </NuxtLink>
    <div class="movie-info">
      <div class="movie-img">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            new Number(movie.revenue).toLocaleString("en-us", 
            {
                style: "currency",
                currency: "USD",
            })
          }}
          <!-- {{
            movie.revenue.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }} -->
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'remotemovieid',

//   async fetch() {
//     await this.getSingleMovie()
//   },

  // delay for fetching
//   fetchDelay: 1000,

  head() {
    return {
      title: this.movie.title,
    }
  },

  data() {
    return {
      movie: ''
    }
  },
  methods: {
    async getSingleMovie() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=f08d349ff67d14ad2831b3ee5d66fbe5&language=en-US`
      )
      const result = await data
      this.movie = result.data
    },
  },

  created(){
      this.getSingleMovie();
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/remote.scss';


.single-movie {
  color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;

  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }

  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: var(--color); 
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;

        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }

    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }

      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;

        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }

      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>

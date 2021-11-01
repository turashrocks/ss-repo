<template>
    <div class="home">
    <RemoteHero/>

    <!-- Search -->
    <div class="container search">
      <input
        type="text"
        placeholder="Search"
        @keyup.enter="$fetch"
        v-model.lazy="remotesearchInput"
      />
      <button @click="remoteclearSearch" v-show="remotesearchInput" class="button">
        Clear Search
      </button>
    </div>

    <!-- Movies -->
    <div class="container movies">
      <!-- Search Results -->
      <div v-if="remotesearchInput !== ''" id="movie-grid" class="movies-grid">
        <div class="movie" v-for="(movie, index) in remotesearchedMovies" :key="index">
          <NuxtLink
              :to="{ name: 'remotemovieid', params: { id: movie.id } }"
            >
          <div class="movie-img">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"/>
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
        </NuxtLink>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
          </div>
        </div>
      </div>

      
      <div v-else id="movie-grid" class="movies-grid">
        <div class="movie" v-for="(movie, index) in remotemovies" :key="index">
          <NuxtLink
              :to="{ name: 'remotemovieid', params: { id: movie.id } }"
            >
          <div class="movie-img">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"/>
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
        </NuxtLink>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RemoteHero from '@/components/RemoteHero'

export default {

  // data() {
  //   return {
      remotemovies: [],
      remotesearchedMovies: [],
      remotesearchInput: '',
  //   }
  // },
  components: {
    RemoteHero
  },
  // data() {
  //   return {
  //     remotemovies: [],
  //     remotesearchedMovies: [],
  //     remotesearchInput: '',
  //   }
  // },

    async getMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=f08d349ff67d14ad2831b3ee5d66fbe5&language=en-US&page=1`
      )
      const result = await data
      // console.log(result)
      result.data.results.forEach((movie) => {
        this.remotemovies.push(movie)
      })
      // console.log(this.remotemovies)
    },

    async remotesearchMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f08d349ff67d14ad2831b3ee5d66fbe5&language=en-US&page=1&query=${this.remotesearchInput}`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.remotesearchedmovies.push(movie)
      })
    },
  async fetch() {
    if (this.remotesearchInput === '') {
      await this.getMovies()
      return
    }

    if (this.remotesearchInput !== '') {
      await this.remotesearchMovies()
    }
  },
  fetchDelay: 1000,

   remoteclearSearch() {
      this.remotesearchInput = ''
      this.remotesearchedMovies = []
    },

  // methods: {
  //   remoteclearSearch() {
  //     this.searchInput = ''
  //     this.searchedMovies = []
  //   },
  // },

  activated() {
    this.getMovies();
    this.remotesearchMovies();
    this.remoteclearSearch();
    this.fetch();
  },
  // mounted() {
  //   this.getMovies();
  //   this.remotesearchMovies();
  //   this.remoteclearSearch();
  // }
}

</script>


<style lang="scss" scoped>
@import '@/assets/scss/remote.scss';

.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }

  .search {
    display: flex;
    padding: 32px 16px;

    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;

      &:focus {
        outline: none;
      }
    }

    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }

      .movie {
        position: relative;
        display: flex;
        flex-direction: column;

        .movie-img {
          position: relative;
          overflow: hidden;

          &:hover {
            .overview {
              transform: translateY(0);
            }
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
          }

          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: var(--color);
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: var(--color);
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }

        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: var(--color);
            font-size: 20px;
          }

          .release {
            margin-top: 8px;
            color: var(--color);
          }

          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>

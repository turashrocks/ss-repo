<template>
  <div class="home">
    <!-- Hero -->
    <RemoteHero/>

    <!-- Search -->
    <div class="container search">
      <input
        type="text"
        placeholder="Type and Press Enter to Search"
        @keyup.enter="fetch()"
        @keyup.delete="remoteclearSearch()"
        v-model.lazy="remotesearchInput"
      />
      <button v-show="remotesearchInput !== ''" @click="remoteclearSearch" class="button">
        Clear Search
      </button>
    </div>

    <!-- Movies -->
    <div class="container movies">
    <!-- Loading Animation -->
    <!-- <Loading v-if="$fetchState.pending" /> -->

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
  head() {
    return {
      title: 'Movie App - Latest Streaming Movie Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, stremaing',
        },
      ],
    }
  },

  data() {
    return {
      remotemovies: [],
      remotesearchedMovies: [],
      remotesearchInput: '',
    }
  },
  components:{
    RemoteHero
  },

  methods: {
    async remotegetMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US&page=1`
      )
      const result = await data
      // console.log(result)
      result.data.results.forEach((movie) => {
        this.remotemovies.push(movie)
      })
      // console.log(this.movie)
    },

    async remotesearchMovies(){
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US&page=1&query=${this.remotesearchInput}`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.remotesearchedMovies.push(movie)
      })
      // console.log(this.remotesearchMovies)
    },

    remoteclearSearch() {
      this.remotesearchInput = ''
      this.remotesearchedMovies = []
    },
    // WORKS
    // async fetch() {
    //   if (this.remotesearchInput === '') {
    //       await this.remotegetMovies()
    //       return
    //     }
    //   await this.remotesearchMovies()
    // }

    async fetch() {
    if (this.remotesearchInput === '') {
      await this.remotegetMovies()
      return
    }

    if (this.remotesearchInput !== '') {
      await this.remotesearchMovies()
    }
    },
  },
   created(){
    this.remotegetMovies();
    this.remotesearchMovies();
    this.remoteclearSearch();
    this.fetch();
  },
  watch: {
    remotesearchInput() {
      console.log(this.remotesearchInput)
    },
  },

  // activated(){
  //   this.remotegetMovies();
  //   this.remotesearchMovies();
  //   this.remoteclearSearch();
  //   this.fetch();
  // }
}
</script>

<style lang="scss">
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
      border: 0px !important;
      background: var(--color-primary);
      color: var(--color-secondary);
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
            color: #fff;
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
            color: #fff;
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
            color: #c9c9c9;
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

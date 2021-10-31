<template>
  <div class="setting-block">
    <div class="setting-title font-16 fw-500">Movies</div>

    <div class="setting-body white-bg-color">
      <table class="table table-striped">
        <thead>
          <tr>
            <td></td>
            <td>Title</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td>
              <div v-if="movie.images">
                <img :src="movie.images.thumbnail" width="100" />
              </div>
            </td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.is_live ? 'Published' : 'Draft' }}</td>
            <td>
              <nuxt-link
                :to="{ name: 'movies.edit', params: { id: movie.id } }"
              >
                Edit
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      movies: []
    };
  },

  methods: {
    async fetchUserMovies() {
      const { data } = await this.$axios.$get(
        `/users/${this.$auth.user.id}/movies`
      );
      this.movies = data;
    }
  },

  created() {
    this.fetchUserMovies();
  }
};
</script>

<style></style>

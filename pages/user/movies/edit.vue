<template>
  <div>
    <!-- Start Hero -->
    <section class="hero text-center bg-secondary mb-4">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          Update Movie Information
        </h1>
      </div>
    </section>
    <!-- End Hero -->

    <!-- Upload Shot -->
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-1" v-if="movie.images">
              <img :src="movie.images.large" class="w-100 mb-4" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                  Movie successfully updated
                </alert-success>
                <div class="form-group">
                  <base-input
                    :form="form"
                    field="title"
                    v-model="form.title"
                    placeholder="Enter a title"
                  ></base-input>
                </div>
                <div class="form-group">
                  <base-textarea
                    :form="form"
                    field="description"
                    v-model="form.description"
                    placeholder="Enter a description"
                  ></base-textarea>
                </div>
                <div class="form-group">
                  <client-only>
                    <better-input-tag
                      :tags="form.tags"
                      placeholder="Tags separated by commas"
                      on-paste-delimiter=","
                    ></better-input-tag>
                  </client-only>
                </div>
                <template v-if="studios.length">
                  <div class="form-group">
                    <select
                      class="custom-select"
                      :class="{ 'is-invalid': form.errors.has('studio') }"
                      v-model="form.studio"
                    >
                      <option :value="null">Select a studio</option>
                      <option
                        v-for="studio in studios"
                        :key="studio.id"
                        :value="studio.id"
                      >
                        {{ studio.name }}
                      </option>
                    </select>
                    <has-error :form="form" field="studio"></has-error>
                  </div>
                </template>
                <div class="form-group custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="is_live"
                    v-model="form.is_live"
                  />
                  <label
                    class="custom-control-label"
                    value="true"
                    for="is_live"
                  >
                    Publish this movie
                  </label>
                </div>

                <div class="text-right">
                  <nuxt-link :to="{ name: 'settings.movies' }"
                    >Cancel</nuxt-link
                  >
                  <base-button :loading="form.busy">
                    Update Movie
                  </base-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Upload Shot -->
  </div>
</template>

<script>
import BetterInputTag from 'better-vue-input-tag';
export default {
  middleware: ['auth'],
  components: {
    BetterInputTag
  },
  data() {
    return {
      form: this.$vform({
        title: '',
        description: '',
        is_live: false,
        tags: [],
        assign_to_studio: true,
        studio: null
      })
    };
  },

  async asyncData({ $axios, params, error, redirect }) {
    try {
      const movie = await $axios.$get(`/movies/${params.id}/byUser`);
      const studios = await $axios.$get(`/users/studios`);

      return { movie: movie.data, studios: studios.data };
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Movie not found' });
      } else if (err.response.status === 401) {
        redirect('/login');
      } else {
        error({ statusCode: 500, message: 'Internal server error' });
      }
    }
  },

  methods: {
    submit() {
      this.form
        .put(`/movies/${this.$route.params.id}`)
        .then(res => {
          setTimeout(() => {
            this.$router.push({ name: 'settings.movies' });
          }, 1000);
        })
        .catch(err => console.log(err.response));
    }
  },

  mounted() {
    if (this.movie) {
      Object.keys(this.form).forEach(key => {
        if (this.movie.hasOwnProperty(key)) {
          this.form[key] = this.movie[key];
        }
      });
      this.form.tags = this.movie.tag_list.tags || [];

      if (this.movie.studio) {
        this.form.studio = this.movie.studio.id;
        this.form.assign_to_studio = true;
      } else {
        this.form.assign_to_studio = false;
      }
    }
  }
};
</script>

<style></style>

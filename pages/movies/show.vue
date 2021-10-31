<template>
  <section class="post-details mt-4 pb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="row">
            <!-- LEFT -->
            <div class="col-md-8">
              <!-- Single Image -->
              <div class="post-detail">
                <div class="single-img">
                  <img :src="movie.images.large" />
                </div>
              </div>
              <!-- End Single Image -->
              <!-- Movie Detail Text -->
              <div class="desing-text font-16 fw-400 pb-3 pt-2">
                <p>
                  {{ movie.description }}
                </p>
              </div>
              <!-- End Movie Detail Text -->
              <!-- Movie Comments -->
              <div class="movie-comments mt-3">
                <h1 class="font-16 fw-300 mb-4">
                  <strong class="fw-500">{{ comments.length }} comments</strong>
                </h1>
                <ul class="comment-list">
                  <MovieComment
                    v-for="comment in comments"
                    :key="comment.id"
                    :comment="comment"
                    @deleted="handleDelete"
                  ></MovieComment>
                </ul>
              </div>

              <template v-if="$auth.loggedIn">
                <form @submit.prevent="save">
                  <base-textarea
                    :rows="2"
                    :form="form"
                    field="body"
                    v-model.trim="form.body"
                    placeholder="Enter a comment"
                  ></base-textarea>

                  <div class="mt-2 text-right">
                    <base-button :loading="form.busy" size="sm">
                      Post comment
                    </base-button>
                  </div>
                </form>
              </template>

              <!--/ END COMMENTS-->
            </div>

            <!-- RIGHT -->
            <div class="col-md-4">
              <div class="post-detail-sidebar">
                <!-- Movieer info -->
                <div class="modal-user-meta white-bg-color">
                  <a class="float-left" href="#" title="Neba">
                    <img :src="movie.user.photo_url" alt="Neba" />
                  </a>
                  <div class="modal-user-detail">
                    <h1 class="font-13 fw-500">
                      <a href="#">
                        {{ movie.user.name }}
                      </a>
                    </h1>
                    <p class="font-12 fw-300 mt-1">
                      <span class="shot-by">{{ movie.user.tagline }}</span>
                    </p>
                    <p class="font-12 fw-300  mt-1">
                      {{ movie.created_at_dates.created_at_human }}
                    </p>
                  </div>
                </div>
                <!-- End Movieer info -->
                <!-- Movieer Movie Info -->
                <ul class="details-side-meta font-14 fw-400">
                  <MovieLike :movie="movie"></MovieLike>

                  <li class="d-table w-100">
                    <div class="stats-txt d-table-cell w-100">
                      <a href="#"> More from {{ movie.user.name }} </a>
                    </div>
                  </li>
                </ul>
                <!-- End Movieer Movie Info -->
                <!-- Movieer More Movies -->
                <div class="more-movies-outer pb-3">
                  <ul class="more-movies row">
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- End Movieer More Movies -->
                <!-- Movies Tags -->
                <div class="movies-tag-outer mt-3">
                  <h2 class="font-16 fw-500 mb-2">
                    Tags
                  </h2>
                  <div
                    class="movies-tag font-14 fw-300"
                    v-if="movie.tag_list"
                  >
                    <a
                      v-for="(tag, i) in movie.tag_list.tags"
                      :key="`tag-${i}`"
                      :href="`/tags/${movie.tag_list.normalized[i]}`"
                    >
                      {{ tag }}
                    </a>
                  </div>
                </div>
                <!-- End Movies Tags -->
              </div>
            </div>
            <!--/ END RIGHT-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MovieComment from '@/components/MovieComment';
import MovieLike from '@/components/MovieLike';
export default {
  components: {
    MovieComment,
    MovieLike
  },
  data() {
    return {
      form: this.$vform({
        body: ''
      })
    };
  },

  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.$get(`/movies/slug/${params.slug}`);
      return { movie: response.data, comments: response.data.comments };
    } catch (e) {
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
    handleDelete(id) {
      this.comments = this.comments.filter(c => c.id !== id);
    },

    save() {
      this.form
        .post(`/movies/${this.movie.id}/comments`)
        .then(res => {
          this.form.reset();
          this.comments = [...this.comments, res.data.data];
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style></style>

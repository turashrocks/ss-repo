<template>
  <div class="w-100 col-sm-6 col-md-3 d-flex flex-column p-3">
    <div
      class="bg-white rounded shadow-sm overflow-hidden flex-1 flex flex-col p-1"
    >
      <nuxt-link :to="`/movie/${movie.slug}`">
        <div
          class="bg-cover h-48"
          :style="`background-image: url('${movie.images.thumbnail}');`"
        >
          <div
            class="post-overlay p-4 d-flex flex-column align-items-center justify-content-center"
          >
            <h5 class="fw-500 text-uppercase mb-2">
              {{ movie.title }}
            </h5>
            <p class="font-12 lh-16">
              {{ movie.description }}
            </p>
            <div class="card-datetime font-10 fw-300">
              {{ movie.created_at_dates.created_at_human }}
            </div>
          </div>
        </div>
      </nuxt-link>
      <div class="p-1 d-flex flex-column">
        <div
          class="mb-0 text-secondary d-flex justify-content-between align-items-center"
        >
          <nuxt-link :to="`/`" class=" d-flex text-muted">
            <div>
              <img
                :src="movie.user.photo_url"
                width="20"
                class="profile rounded mr-2"
              />
            </div>
            <h3 class="card-title font-13 mt-1 mb-2 fw-400">
              {{ movie.user.name }}
              <span
                v-if="movie.studio"
                class="badge badge-pill badge-secondary font-10 pr-1 pl-1 fw-300"
                >+ studio</span
              >
            </h3>
          </nuxt-link>
          <div class="mr-1 font-10 flex-2">
            {{ movie.created_at_dates.created_at_human }}
          </div>
        </div>
        <div class="card-datetime fw-300 d-flex justify-content-center">
          <div class="ml-1 text-right flex-1">
            <ul class="font-12 fw-400 list-inline text-light-gray">
              <li class="pt-0 list-inline-item">
                <i class="fas fa-thumbs-up"></i>
                {{ movie.likes_count }}
              </li>
              <li class="pt-0 list-inline-item">
                <i class="fas fa-comments"></i>
                {{ movie.comments_count }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- CARD -->
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>

<template>
  <div class="user-account-setting">
    <div class="container">
      <div class="row">
        <!-- LEFT -->
        <div class="col-sm-3">
          <div class="list-group">
            <nuxt-link
              v-for="link in links"
              :key="link.route"
              :to="{ name: link.route }"
              class="list-group-item list-group-item-action"
            >
              {{ link.title }}
            </nuxt-link>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-sm-9">
          <router-view></router-view>
        </div>
        <!-- END RIGHT -->
      </div>
    </div>
    <!-- END CONTAINER -->
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      links: [
        { title: 'Movies', route: 'settings.movies' }
      ]
    };
  }
};
</script>

<style></style>

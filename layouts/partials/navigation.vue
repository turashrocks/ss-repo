<template>
  <header class="fixed-topx">
    <nav class="navbar navbar-expand-lg navbar-dark align-items-center">
      <nuxt-link to="/" class="navbar-brand text-uppercase fw-500">MovieHouse</nuxt-link>
      <button
        class="navbar-toggler mr-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav font-14 fw-300">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/remote-movies" title="Remote">Remote</nuxt-link>
          </li>
        </ul>
        <div class="upload-shot white-path font-14 text-uppercase">
          <nuxt-link to="/upload" class="primary-bg-color">
            Upload
          </nuxt-link>
        </div>
        <template v-if="!$auth.loggedIn">
        <div class="upload-shot white-path font-14 text-uppercase">
          <nuxt-link to="/register" class="primary-bg-color">
            Register
          </nuxt-link>
        </div>
        <div class="upload-shot white-path font-14 text-uppercase" style="margin-right: 30px;">
          <nuxt-link to="/login" class="primary-bg-color">
            Login
          </nuxt-link>
        </div>
        </template>
      </div>
      <!-- Before Login -->
      <template v-if="!$auth.loggedIn">
        <!-- <ul class="before-login font-14 fw-300 text-uppercase">
          <li>
            <nuxt-link to="/register">Sign Up</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/login">Login</nuxt-link>
          </li>
        </ul> -->
      </template>
      <!-- End Before Login -->

      <!-- After Login -->
      <template v-else>
        <ul class="author-page white-path">
          <!-- Profile Dropdown -->
          <li class="dropdown">
            <nuxt-link
              to="#"
              class="dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img class="user-thumb" :src="$auth.user.photo_url" />
              <div class="usr-info">
                <span class="user-name font-14 fw-500">
                  {{
                  $auth.user.name
                  }}
                </span>
                <span class="user-deg font-10 fw-300">
                  {{
                  $auth.user.tagline
                  }}
                </span>
                <span class="down-chevron">
                  <i class="fa fa-angle-down"></i>
                </span>
              </div>
            </nuxt-link>
            <div class="dropdown-menu user-dropdown font-14 fw-500" aria-labelledby="userDropdown">
              <nuxt-link class="dropdown-item" to="/settings/movies" title="Profile">
                <i class="fa fa-user"></i>
                Edit Movies
              </nuxt-link>
              <div class="dropdown-item" @click.prevent="logout">
                <i class="fa fa-lock"></i>
                Sign Out
              </div>
            </div>
          </li>
          <!-- End Profile Dropdown -->
        </ul>
      </template>
      <!-- End After Login -->

      <ColorModePicker />
    </nav>
  </header>
</template>

<script>
import ColorModePicker from '@/components/ColorModePicker.vue'

export default {
  components:{
    ColorModePicker
  },
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
};
</script>

<style></style>

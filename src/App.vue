<template>
  <NavigationLayout v-if="show"></NavigationLayout>
  <AdminNavLayout v-if="!show"></AdminNavLayout>

  <v-content>
    <router-view></router-view>
  </v-content>
  <FooterLayout v-if="show"></FooterLayout>
</template>

<script>
import NavigationLayout from "./components/Layout/NavigationLayout.vue"
import FooterLayout from "./components/Layout/FooterLayout.vue"
import AdminNavLayout from "./components/Layout/AdminLayout.vue"
export default {
  name: "App",
  components: {
    NavigationLayout,
    FooterLayout,
    AdminNavLayout
  },
  data() {
    return {
      show: true
    };
  },
  watch: {
    $route(to) {
      if (to.path.startsWith("/admin")) {
        this.show = false;
      }
      else
      {
        this.show = true;
      }
    }
  }
};
</script>
<style></style>

<template>
<h1 class="pt-4">{{title}}</h1>
  <div id="nav" v-if="$store.state.user">
    <router-link class="btn btn-light" to="/">Home</router-link> |
    <router-link to="/about" class="btn btn-light">About</router-link> | 
    <!-- <router-link to="/add">Add Items</router-link> |  -->
    <button class="btn btn-danger" @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view/>
</template>
<script>
export default {
  name: "ComponentHeader",
  props: {
    title: {
      type: String,
      default: "AniBudget",
    },
  }
};
</script>
<style scoped>
header {
  color: crimson;
}
</style>

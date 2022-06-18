<template>
  <header v-if="$store.state.user">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="$store.dispatch('logout')">Logout</button>
    </div>
    <h1>{{ title }}</h1>
    <Button @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'close' : 'Add Task'" :color="showAddTask ? 'red': 'green'"/>
      
  </header>
  <router-view/>
</template>
<script>
import Button from "./Component-Button.vue";
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "My Tracker",
    },
    showAddTask: Boolean
  },
  components: {
    Button,
  },
};
</script>
<style scoped>
header {
  color: crimson;
}
</style>

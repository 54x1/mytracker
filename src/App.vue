<template>
  <div id="nav" v-if="$store.state.user">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/add-items">Add Items</router-link> | 
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


// <Login v-if="!$store.state.user"/>
// <div class="container">
//   <div id="nav" v-if="$store.state.user">
//     <router-link to="/">Home</router-link> |
//     <router-link to="/About">About</router-link>
//     <button @click="$store.dispatch('logout')">Logout</button>
//     <router-view/>
//   </div>
//   <div v-show="showAddTask">
//   <AddTask @add-task="addTask" />
//   </div>
//   <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
//   <Header />

// import Tasks from './components/Component-Tasks.vue'
// import AddTask from './components/Component-AddTask.vue'
// import Header from '../components/Component-Header.vue'
// export default {
//   name: 'Page-Home',
//   components: {
//     Tasks,
//     AddTask,
//     Header
//   },
//   data(){
//     return {
//       tasks: [],
//       showAddTask: false
//     }
//   },
//   methods:{
//     toggleAddTask(){
//       this.showAddTask = !this.showAddTask
//     },
//     addTask(task){
//       this.tasks = [...this.tasks, task]
//     },
//     deleteTask(id){
//       if (confirm("Are you sure?")){
//       this.tasks = this.tasks.filter((task)=> task.id !== id)
//     }
//     },
//     toggleReminder(id){
//       this.tasks = this.tasks.map((task)=> task.id === id ? {...task, reminder: !task.reminder} : task)
//     }
//   }
// }



// import { onBeforeMount } from 'vue'
// import { useStore } from 'vuex'

// import Login from './views/Page-Login.vue'
// export default {
//   name: 'App',
//   components: {
//     Login
//   },
//   data(){
//     return {
//       tasks: [],
//       showAddTask: false
//     }
//   },
//   methods:{
//     toggleAddTask(){
//       this.showAddTask = !this.showAddTask
//     },
//     addTask(task){
//       this.tasks = [...this.tasks, task]
//     },
//     deleteTask(id){
//       if (confirm("Are you sure?")){
//       this.tasks = this.tasks.filter((task)=> task.id !== id)
//     }
//     },
//     toggleReminder(id){
//       this.tasks = this.tasks.map((task)=> task.id === id ? {...task, reminder: !task.reminder} : task)
//     }
//   },
//   created() {
//     this.tasks = [
//       {
//         id: 1
//       },
//       {
//         id: 2,
//         reminder: true
//       }
//     ]
//   },
//   setup() {
//     const store = useStore()

//     onBeforeMount(() => {
//       store.dispatch('fetchUser')
//     })
//   }
// }

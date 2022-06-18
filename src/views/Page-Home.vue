<template>
  <main class="home">
    <h1>Home</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ul class="list-group">
            <li v-for="item in items" :key="item.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{item.name}}
              <span class="badge badge-primary badge-pill">
              <router-link :to="{path:`/item/${item.id}`}" class="btn btn-primary">Edit</router-link>
              <a href="#" @click="deleteItem(item.id)" class="btn btn-danger">Delete</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import itemsColRef from '../firebase'
import { getDocs, doc, deleteDoc } from 'firebase/firestore'
export default {
  name: "Page-Home",
  components: {

  },
  data(){
    return {
      items: [],
      selectedDoc: null
    }
  },
  methods:{
    async fetchItems(){
      let itemsSnap = await getDocs(itemsColRef)
      let items = []
      itemsSnap.forEach(item=>{
        let itemData = item.data();
        itemData.id = item.id;
        items.push(itemData);
      })
      this.items = items
            console.log(items)
    },
    async deleteItem(itemId){
       let itemRef = doc(itemsColRef, itemId)
       await deleteDoc(itemRef)
       alert("Item has been deleted!")
       this.$router.go()
    }
  },
  created(){
    this.fetchItems()
  }
}
</script>

<style>

</style>
<template>
  <main class="home">
    <h1>Welcome {{username}}!</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
         <router-link :to="{path:`/create`}" class="mb-3 btn btn-success">Create Category</router-link>

         <!-- <button @click="toggle = !toggle" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".collapse">
        <span v-if="!toggle">Expand All</span>
         <span v-if="toggle">Close All</span>
      </button> -->
<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item" v-for="category in categories" :key="category.id">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">


     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#categoryTopic-'+category.id" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                  <span class="w-100 badge badge-primary badge-pill badge-right">
             <span class="w-100 btn btn-primary">{{category.name}}</span>
                <router-link @click="pathTo(category.id)" :to="{path:`/edit/${category.id}`}" class="btn btn-secondary mx-2">Edit</router-link>
              <a href="#" @click.stop="deleteCate(category.id, userId)" id="del" class="btn btn-danger">Delete</a>
     
              </span>
      </button>
      
    </h2>
 <div v-for="item in items" :key="item.id" :id="'categoryTopic-'+category.id" class="accordion-collapse collapse hide" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body" v-if="item.category == category.id">
    <ul class="list-group" >
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <router-link :to="{path:`/item/${item.id}`}" class="btn btn-secondary w-75">
              {{item.name}} 
              </router-link>
              <span class="badge badge-primary badge-pill">
              <router-link :to="{path:`/edit/${item.id}`}" class="btn btn-primary mx-2">Edit</router-link>
              <a href="#" @click.stop="deleteItem(item.id, userId)" id="del" class="btn btn-danger">Delete</a>
              </span>
            </li>
          </ul>
    </div>
   
    </div>
     <router-link :to="{path:`/add/${category.id}`}" class="mb-3 btn btn-success">Add Item</router-link>
  </div>
</div>
          
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import itemsColRef from '../firebase'
import {getDocs, doc, deleteDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";

let userId
let username
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
     userId = user.uid;
     username = user.displayName ?  user.displayName : user.email

  }
});

export default {
  name: "Page-Home",
  data(){
    return {
      userId: userId,
      username: username,
      items: [],
      categories: []
      // toggle: false
    }
  },
  methods:{
    pathTo(cateId){
      this.$router.push('/category/'+cateId)
    },
    async fetchItems(userId) {
      let categories = []
      let items = []
let cateSnap = await getDocs(itemsColRef, userId)
 cateSnap.forEach(cate=>{
        console.log('catesnap', cate.data())
        if (cate.data().userId === userId && !cate.data().category){
         console.log("item.id", cate.id)
         let cateData = cate.data()
         cateData.id = cate.id
        categories.push(cateData);
        }


if (cate.data().userId === userId && cate.data().category !== cate.data().id) {
        let catData = cate.data()
        catData.id = cate.id
        items.push(catData);
        }
      })
      this.items = items
      this.categories = categories
       
//        console.log(itemsSnap)
    console.log("cate", categories)
        console.log("item", items)
       
  },
     async deleteItem(itemId, userId){
       let itemRef = doc(itemsColRef, itemId)
        await deleteDoc(itemRef)
       alert("Item has been deleted!")
      let items = []
      console.log(userId)
let itemsSnap = await getDocs(itemsColRef, userId)
 itemsSnap.forEach(item=>{
        // 
        if (item.data().userId === userId){
         console.log(item.id)
         let itemData = item.data()
         itemData.id = item.id
        items.push(itemData);
        }
      })
      this.items = items
            console.log("fiitems", items)
       
    },
         async deleteCate(cateId, userId){
       let cateRef = doc(itemsColRef, cateId)
        await deleteDoc(cateRef)
       alert("Item has been deleted!")
      let categories = []
let cateSnap = await getDocs(itemsColRef, userId)
 cateSnap.forEach(cate=>{
        console.log('catesnap', cate.data())
        if (cate.data().userId === userId && cate.data().category){
         console.log("item.id", cate.id)
         let cateData = cate.data()
         cateData.id = cate.id
        categories.push(cateData);
        }
         })
         }
  },
  created(){
    this.fetchItems(userId)
  }
}
</script>

<style>

</style>
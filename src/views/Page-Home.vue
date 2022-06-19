<template>
  <main class="home">
    <h1>Welcome {{username}}!</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ul class="list-group">
            <li v-for="item in items" :key="item.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
            <router-link :to="{path:`/item/${item.id}`}" class="btn btn-secondary">
              {{item.name}}
              </router-link>
              <span class="badge badge-primary badge-pill">
              <router-link :to="{path:`/edit/${item.id}`}" class="btn btn-primary">Edit</router-link>
              <a href="#" @click.stop="deleteItem(item.id)" id="del" class="btn btn-danger">Delete</a>
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
  components: {

  },
  data(){
    return {
      username: username,
      items: [],
      selectedDoc: null
    }
  },
  methods:{
//     async itemInfo(itemId){
      
//       let itemSnap = await getDoc(itemsColRef,itemId)
//             // let ref = getDocs(itemId)
//             itemSnap.get().then(snapshot => {  //DocSnapshot
//       if (snapshot.exists) {
//           let post = snapshot.data()
//             console.log("iiitem", post)
//       } else {
//           // snapshot.data() will be undefined in this case
//           console.log("No such document!");
//       }  
// })
          
//       console.log("itemSnap", itemSnap)
//       console.log(`${itemId} has been clicked!`)
//     },
    async fetchItems(){
      let itemsSnap = await getDocs(itemsColRef, userId)
      let items = []
      itemsSnap.forEach(item=>{
        let itemData = item.data();
        itemData.id = item.id;
        items.push(itemData);
      })
      this.items = items
            console.log("fiitems", items)
    },
     async deleteItem(itemId){
       let itemRef = await doc(itemsColRef, itemId)
        await deleteDoc(itemRef)
       alert("Item has been deleted!")
       let itemsSnap = await getDocs(itemsColRef, userId)
      let items = []
      itemsSnap.forEach(item=>{
        let itemData = item.data();
        itemData.id = item.id;
        items.push(itemData);
      })
      this.items = items
            console.log("fiitems", items)
       
    }
  },
  created(){
    this.fetchItems()
  }
}
</script>

<style>

</style>
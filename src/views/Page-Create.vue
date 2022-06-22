
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1>Create Category</h1>
          <form @submit.prevent="addItem()">
            <div class="form-group d-flex">
              <input
                type="text"
                class="form-control mx-4"
                placeholder="Enter Category Name"
                v-model="name"
              />
              <!-- <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{{value}}</button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
      <li v-for="option in options" :key="option">
        <a class="dropdown-item"  @click="value = option" href="javascript:void(0)">{{option}}</a>
      </li>
    </ul>
  </div> -->
            </div>
              
            <button type="submit" class="btn btn-primary">Create Category</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsColRef from '../firebase'
import {addDoc} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
let userId
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
     userId = user.uid;
  }
});
// https://masteringjs.io/tutorials/vue/dropdown
export default {

  data(){
    return {
  //   options: [ 'Weekly','Fortnightly','Monthly','Annually'],
  // value: 'Weekly',
      userId: userId,
      name: null,
    }
  },
  methods: {
    async addItem() {

      const addedDoc = await addDoc(itemsColRef, this.$data)
            console.log('creating here', addedDoc)
            alert("Item Added!")
            this.$router.push("/")
    }

  }
};
</script>

<style></style>

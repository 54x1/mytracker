<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1>Add Item</h1>
          <form @submit.prevent="addItem()" class="form-inline">
            <div class="d-flex">
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Name"
                v-model="name"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Amount"
                v-model="amount"
              />
            </div>
              <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{{value}}</button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
      <li v-for="option in options" :key="option">
        <a class="dropdown-item"  @click="value = option" href="javascript:void(0)">{{option}}</a>
      </li>
    </ul>
  </div>
  </div>
            <button type="submit" class="w-100 btn btn-primary">Add Item</button>
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
export default {
  data(){
    return {
      options: [ 'Weekly','Fortnightly','Monthly','Annually'],
      userId: userId,
      name: null,
      amount: null,
      value: 'Weekly',
      category: this.$route.params.catId
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

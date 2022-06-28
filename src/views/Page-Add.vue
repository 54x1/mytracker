<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-8 offset-md-0 offset-lg-2">
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
                type="number"
                step="any"
                class="form-control mb-2"
                placeholder="Enter Amount"
                v-model="amount"
              />
            </div>
            <select class="form-select w-50 mb-2" v-model="selected">
  <option v-for="option in options" :key="option" :value="`${option.value}`">{{option.period}}</option>
</select>
              <!-- <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{{value}}</button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
      <li v-for="option in options" :key="option">
        <a class="dropdown-item"  @click="value = option" href="javascript:void(0)">{{option}}</a>
      </li>
    </ul>
  </div> -->
  </div>
            <button type="submit" class="w-100 btn btn-primary">Add Item</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {itemsColRef} from '../firebase'
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
      userId: userId,
      name: null,
      amount: null,
      category: this.$route.params.catId,
      selected: "52",
      options: [
            { period: "Weekly", value: "52" },
            { period: "Fortnightly", value: "26" },
            { period: "Monthly", value: "12" },
            { period: "Quarterly", value: "4" },
            { period: "Annually", value: "1" }
            ],
    }
  },
  methods: {
    async addItem() {

      const addedDoc = await addDoc(itemsColRef, this.$data)
            console.log('creating here', addedDoc)
            // alert("Item Added!")
            this.$router.push("/")
    }

  }
};
</script>

<style></style>

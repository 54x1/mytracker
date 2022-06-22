
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1>Edit {{itemName}} </h1>
          <form @submit.prevent="editItem()">
          <div class="form-flex">
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Name"
                v-model="itemInfo.name"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Amount"
                v-model="itemInfo.amount"
              />
            </div>
              <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{{itemInfo.value}}</button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
      <li v-for="option in options" :key="option">
        <a class="dropdown-item"  @click="itemInfo.value = option" href="javascript:void(0)">{{option}}</a>
      </li>
    </ul>
  </div>
  </div>
            <button type="submit" class="btn btn-primary">Update Item</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsColRef from '../firebase'
import {getDoc, doc, setDoc} from 'firebase/firestore'
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
      itemName: null,
      selectItem: {},
      docRef: null,
      options: [ 'Weekly','Fortnightly','Monthly','Annually'],
      itemInfo: {
        userId: null,
        value: null,
        name: null,
        amount: null
      }
    }
  },
  methods: {
    async getItem() {
      let itemRef =  doc(itemsColRef, this.itemId)
          this.docRef = itemRef
             
    let item = await getDoc(this.docRef)
    console.log("item", item.data())
    this.itemName = item.data().name
    let itemData = item.data()
    this.itemInfo.name = itemData.name
    this.itemInfo.amount = itemData.amount
    this.itemInfo.value = itemData.value
    this.itemInfo.userId = userId
  },
  async editItem(){
    await setDoc(this.docRef, this.itemInfo)
    alert("item has been updated")
    this.$router.push('/')
  }
  },
  created(){
    let itemId = this.$route.params.itemId
    this.itemId = itemId
    this.getItem()
  }
};
</script>

<style></style>

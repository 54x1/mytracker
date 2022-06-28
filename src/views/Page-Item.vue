
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-8 offset-md-0 offset-lg-2">
          <h1>{{itemInfo.name}} </h1>
          <form @submit.prevent="editItem()">
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
                placeholder="Enter Rank"
                v-model="itemInfo.rank"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Status"
                v-model="itemInfo.status"
              />
            </div>
            <router-link :to="{path:`/edit/${this.$route.params.itemId}`}" class="btn btn-primary">Edit {{itemInfo.name}}</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {itemsColRef} from '../firebase'
import {getDoc, doc} from 'firebase/firestore'
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
      selectItem: {},
      docRef: null,
      itemInfo: {
        userId: null,
        name: null,
        rank: null,
        status: null
      }
    }
  },
  methods: {
    async getItem() {
      let itemRef = await doc(itemsColRef, this.itemId)
          this.docRef = itemRef
    let item = await getDoc(this.docRef)
    console.log("item", item.data())
    let itemData = item.data()
    this.itemInfo.name = itemData.name
    this.itemInfo.rank = itemData.rank
    this.itemInfo.status = itemData.status
    this.itemInfo.userId = userId
  },
  },
  created(){
    let itemId = this.$route.params.itemId
    this.itemId = itemId
    this.getItem()
  }
};
</script>

<style></style>


<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1>Edit category</h1>
          <form @submit.prevent="editItem()" class="form-inline">
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Name"
                v-model="itemInfo.name"
              />
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
      selectItem: {},
      docRef: null,
      itemInfo: {
        userId: null,
        name: null,
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
    // this.itemInfo.value = itemData.value
    this.itemInfo.userId = userId
  },
  async editItem(){
    await setDoc(this.docRef, this.itemInfo)
    alert("item has been updated")
    this.$router.push('/')
  }
  },
  created(){
    let itemId = this.$route.params.catId
    this.itemId = itemId
    this.getItem()
  }
};
</script>

<style></style>


<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offet-md-3">
          <h1>Add Items</h1>
          <form @submit.prevent="createItem()">
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
                placeholder="Enter Rank"
                v-model="rank"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Status"
                v-model="status"
              />
            </div>
            <button type="submit" class="btn btn-primary">Create Item</button>
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
      userId: userId,
      name: null,
      rank: null,
      status: null
    }
  },
  methods: {
    async createItem() {

      const addedDoc = await addDoc(itemsColRef, this.$data)
            console.log('creating here', addedDoc)
            alert("Item Added!")
            this.$router.push("/")
    }

  }
};
</script>

<style></style>

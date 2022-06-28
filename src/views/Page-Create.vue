
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-8 offset-md-0 offset-lg-2">
          <h1>Expense Category</h1>
          <form @submit.prevent="addCategory()" class="form-inline">
            <div class="form-group d-flex justify-content-center">
              <input
                type="text"
                class="form-control mx-4"
                placeholder="Enter Category Name"
                v-model="name"
              />
            </div>
              
            <button type="submit" class="btn btn-primary">Create Expense Category</button>
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
    async addCategory() {

      const addedDoc = await addDoc(itemsColRef, this.$data)
            console.log('creating here', addedDoc)
            // alert("Item Added!")
            this.$router.push("/")
    }

  }
};
</script>

<style></style>

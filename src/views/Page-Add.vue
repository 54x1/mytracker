<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-8 offset-md-0 offset-lg-2">
          <h1>Add Item</h1>
          <form @submit.prevent="addItem()" class="form-inline">
            <div class="form-group w-100">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Enter Name"
                v-model="name"
              />
            </div>
            <div class="d-flex justify-content-center mb-2">
              <div class="form-group w-100">
                <input
                  type="number"
                  step="any"
                  class="form-control mb-0"
                  placeholder="Enter Amount"
                  v-model="amount"
                />
              </div>
              <select class="form-select w-50 mb-2" v-model="selected">
                <option
                  v-for="option in options"
                  :key="option"
                  :value="`${option.value}`"
                >
                  {{ option.period }}
                </option>
              </select>
            </div>
           
            <span class="d-flex justify-content-center">
              <button type="submit" class="w-50 btn btn-primary">
              Add Item
            </button> 
            <a @click="pathTo()" class="w-50 btn btn-danger">
              Cancel
            </a>
            </span>
             </form>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { itemsColRef } from "../firebase";
import { addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
let userId;
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
  }
});
export default {
  data() {
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
        { period: "Annually", value: "1" },
      ],
    };
  },
  methods: {
        pathTo() {
      this.$router.push("/");
    },
    async addItem() {
      const addedDoc = await addDoc(itemsColRef, this.$data);
      console.log("creating here", addedDoc);
      // alert("Item Added!")
      this.$router.push("/");
    },
  },
};
</script>

<style></style>

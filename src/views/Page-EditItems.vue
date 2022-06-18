
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offet-md-3">
          <h1>Edit Items </h1>
          <form @submit.prevent="editItem()">
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
            <button type="submit" class="btn btn-primary">Update Item</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsColRef from '../firebase'
import {getDoc, doc} from 'firebase/firestore'
export default {
  data(){
    return {
      selectItem: {},
      itemId: null,
      docRef: null,
      name: null,
      rank: null,
      status: null
    }
  },
  methods: {
    async getItem() {
      let itemRef =  doc(itemsColRef, this.itemId)
          this.docRef = itemRef
    let item = await getDoc(this.docRef)
    let itemData = item.data()
    this.name = itemData.name
    this.rank = itemData.rank
    this.status = itemData.status
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

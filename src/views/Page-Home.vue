<template>
  <main class="home">
    <h1>Welcome {{ username }}!</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-8 offset-md-0 offset-lg-2">
          <router-link :to="{ path: `/create` }" class="mb-3 btn btn-success"
            >Create Expense Category</router-link
          >
          <div class="mb-4">
            View Period
            <div class="w-100">
              <select
                class="form-select"
                v-model="this.selected"
              >
                <option
                  v-for="option in options"
                  :key="option"
                  :value="`${option.value}`"
                >
                  {{ option.period }}
                </option>
              </select>
            </div>
          </div>
          <span class="w-100 btn btn-primary d-flex justify-content-between"
            ><h3 class="mb-0">Total</h3>
            <h3 class="mb-0">
              {{
                calcTotalCate(categories, categories.id).toLocaleString("en-US", {
                  style: "currency",
                  currency: "AUD",
                })
              }}
            </h3></span
          >
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div
              class="accordion-item"
              v-for="category in categories"
              :key="category.id"
            >
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <div
                  class="accordion-button collapsed d-flex flex-column"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#categoryTopic-' + category.id"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <span
                    class="w-100 btn btn-primary d-flex justify-content-between"
                    ><span>{{ category.name }}</span
                    ><span>{{
                      calcTotalItems(category).toLocaleString("en-US", {
                        style: "currency",
                        currency: "AUD",
                      })
                    }}</span>
                  </span>

                  <span class="w-100 badge badge-primary badge-pill">
                    <router-link
                      @click="pathTo(category.id)"
                      :to="{ path: `/category/${category.id}` }"
                      class="btn btn-secondary m-1"
                      >Edit</router-link
                    >
                    <a
                      href="#"
                      @click.stop="deleteCate(category.id, userId)"
                      id="del"
                      class="btn btn-danger m-1"
                      >Delete</a
                    >
                  </span>
                </div>
              </h2>
              <div
                v-for="item in category.items"
                :key="item.id"
                :id="'categoryTopic-' + category.id"
                class="accordion-collapse collapse hide"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body" v-if="item.category == category.id">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <div
                        v-if="!itemEdit"
                        class="
                          btn btn-secondary
                          d-flex
                          justify-content-between
                          w-100
                        "
                      >
                        {{ item.name }}
                        <i v-if="!itemEdit" @click="editInput(item.name)"  class="fas fa-edit m-0 p-0"></i>
                      </div>
                      <span
                        v-if="itemEdit"
                        class="d-flex h1 align-items-center"
                      >
                        <input
                          type="text"
                          class="form-control m-0 w-100"
                          :placeholder="`${item.name}`"
                          v-model="item.name"
                        /><button
                          @click="saveItem(item)"
                          v-if="itemEdit"
                          class="btn-success fa-solid fa-plus"
                        ></button>
                      </span>
                      <div class="d-flex flex-row m-2">
                        <input
                          type="number"
                          step="any"
                          class="form-control mb-0 w-100"
                          placeholder="Enter Amount"
                          @change="saveItem(item)"
                          v-model="item.amount"
                        />
                        <select
                          class="form-select"
                          @change="saveItem(item)"
                            v-model="item.selected"
                        >
                          <option
                            v-for="option in options"
                            :key="option"
                            :value="`${option.value}`"
                          >
                            {{ option.period }}
                          </option>
                        </select>
                      </div>
                      <div class="my-2 btn btn-primary w-100">
                        {{
                          calcItems(
                            item.amount,
                            item.selected,
                            this.selected,
                            item                          
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "AUD",
                          })
                        }}
                      </div>
                      <span class="badge badge-primary badge-pill">
                        <a
                          href="#"
                          @click.stop="deleteItem(item.id, userId)"
                          id="del"
                          class="btn btn-danger mx-1"
                          >Delete</a
                        >
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <router-link
                :to="{ path: `/add/${category.id}` }"
                class="mb-3 btn btn-success"
                >Add Item</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { itemsColRef, viewsColRef } from "../firebase";
import { getDocs, doc, deleteDoc, setDoc, getDoc, addDoc } from "firebase/firestore";
// import { getDocs, doc, deleteDoc, setDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let userId;
let username;
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    username = user.displayName ? user.displayName : user.email;
  }
});

export default {
  name: "Page-Home",
  data() {
    return {
      myItem: null,
      itemEdit: null,
      itemName: null,
      itemAmount: null,
      cateAmount: [],
      canEdit: null,
      userId: userId,
      username: username,
      docRef: null,
      viewDocRef: null,
      selected: null,
      viewInfo: {
        selected: null,
        userId: userId,
      },
      options: [
        { period: "Weekly", value: "52" },
        { period: "Fortnightly", value: "26" },
        { period: "Monthly", value: "12" },
        { period: "Quarterly", value: "4" },
        { period: "Annually", value: "1" },
      ],
      categories: [],
      items: [],
      itemInfo: {
        //   id: null
        //   userId: null,
        //   value: null,
        name: null,
        amount: null,
        //   category: null,
        //   selected: null
      },
    };
  },
  watch: {
    // item(newval, oldval){
    //   console.log("newvalaa", newval, oldval)
    //         newval.forEach((i) => {
    //              console.log('11',i)
    //           i.items.forEach((ii) => {
    //            console.log('22',ii.id)
    //   this.saveItem(newval, ii.id)
    //     })
    //         })
    // },    
    // categories(newval, oldval){
    //   console.log("newvalzzz", newval, oldval)
    //         newval.forEach((i) => {
    //              console.log('11zz',i)
    //           i.items.forEach((ii) => {
    //            console.log('22zz',ii.id)
    //   this.saveItem(newval, ii.id)
    //     })
    //         })
    // },
    selected (newval) {
      this.updateView(userId, newval)
      console.log("newVal: ", newval);
    },
     categories(val){
      console.log("newValzzz", val)
      // this.saveItem()
    },
    },
  methods: {
    async updateView(userId, myView) {
      //  console.log('s',this.selected)
      // this.selected = myView
      console.log("m", myView);

      let viewRef = doc(viewsColRef, userId);
      this.viewDocRef = viewRef;
      this.viewInfo.selected = myView;
      this.viewInfo.userId = userId;
      console.log("this", this.viewInfo);
      await setDoc(this.viewDocRef, this.viewInfo);
    },
    async viewSelected() {},
    editInput(item) {
      this.itemEdit = true;
      console.log("item", item);
    },
    formatData(value) {
      console.log("zz", value);
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "AUD",
      });
    },
    calcTotalCate(categories) {
      let total = 0;
      console.log("categorieszaxasca", categories);
      categories.forEach((i) => {
        i.items.forEach((ii) => {
          total += this.calcItems(ii.amount, ii.selected, this.selected, ii);
      //           let itemRef = doc(itemsColRef, ii.id);
      // this.docRef = itemRef;
      // this.itemInfo = ii;
      // console.log(ii);
      // setDoc(this.docRef, this.itemInfo);
        });
      });
      
            // this.saveItem(categories, itemId)
      // let total=0
      //  total  += categories.value
      return total;
    },
    calcTotalItems(category) {
      let total = 0;
      category.items.forEach((i) => {
        total += this.calcItems(i.amount, i.selected, this.selected, i);
      });
      return total;
    },

     calcItems(amount, period, selected, item) {

      console.log("selectedcz", selected);
      console.log("periodcz", period);
console.log("item", item)
this.items = item
    // this.saveItem(item)
return amount * period/this.selected
    },
    pathTo(cateId) {
      this.$router.push("/category/" + cateId);
    },
    async saveItem(item) {
    
      let itemRef = doc(itemsColRef, item.id);
      this.docRef = itemRef;
      this.itemInfo = item;
      console.log(item);
      await setDoc(this.docRef, this.itemInfo);
      // if (this.item.id){
      //   console.log()
      //      let itemRef = doc(itemsColRef, this.item.id);
      // this.docRef = itemRef;
      // this.itemInfo = this.item;
      // await setDoc(this.docRef, this.itemInfo);
      // }
      this.itemEdit = false
    },
    async fetchItems(userId) {
    let viewRef = doc(viewsColRef, userId);
      this.viewDocRef = viewRef;
      let viewSnap = await getDoc(this.viewDocRef, userId);

      if (!viewSnap.exists()) {
  
               console.log("zzz");
        // if (this.selected === null) {
                  this.selected = "1";
          this.viewInfo.selected = this.selected;
          this.viewInfo.userId = userId;
          await addDoc(viewsColRef, this.viewInfo);
        // }

      }else{
                  console.log("hererer", viewSnap.data());        
        this.viewInfo.selected = viewSnap.data().selected
        this.selected = viewSnap.data().selected
      }

      const categories = [];
      let cateSnap = await getDocs(itemsColRef, userId);

      cateSnap.forEach((cate) => {
        if (cate.data().userId === userId && !cate.data().category) {
          const newCategory = {
            ...cate.data(),
            id: cate.id,
            items: [],
          };
          categories.push(newCategory);
        }
      });
      console.log("categories:", categories);
      cateSnap.forEach((cate) => {
        if (cate.data().userId === userId && cate.data().category) {
          console.log("cate: ", cate.data());
          const itemCategory = categories.find(
            (c) => c.id == cate.data().category
          );
          console.log("itemCategory: ", itemCategory);
          if (itemCategory) {
            itemCategory.items.push({
              ...cate.data(),
              id: cate.id,
            });
          }
        }
      });
      if (categories) {
        this.categories = categories;
      }
    },
    async deleteItem(itemId, userId) {
      if (confirm("Item has been deleted!")) {
        let itemRef = doc(itemsColRef, itemId);
        await deleteDoc(itemRef);
        await this.fetchItems(userId);
      }
    },
    async deleteCate(cateId, userId) {
      if (confirm("Item has been deleted!")) {
        let cateRef = doc(itemsColRef, cateId);
        await deleteDoc(cateRef);
        await this.fetchItems(userId);
      }
    },
    async editItem() {
      await setDoc(this.docRef);
      // alert("item has been updated")
      // this.$router.push('/')
    },
  },
  created() {
    this.fetchItems(userId);
    // this.viewSelected(userId)
  },
};
</script>

<style></style>

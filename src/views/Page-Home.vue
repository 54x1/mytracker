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
              <select @click="updateView(userId, this.selected)" class="form-select" v-model="this.selected">
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
                calcTotalCate(categories).toLocaleString("en-US", {
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
                      :to="{ path: `/edit/${category.id}` }"
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
                        class="btn btn-secondary d-flex justify-content-between w-100"
                      >
                        {{ item.name }}
                        <i
                          v-if="!itemEdit"
                          @click="editInput(item.name)"
                          class="fas fa-edit m-0 p-0"
                        ></i>
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
                        /><button @click="saveItem(item)"
                          v-if="itemEdit" class="btn-success fa-solid fa-plus"></button>
                      </span>
                      <div class="d-flex flex-row m-2">
                        <input
                          type="number"
                          step="any"
                          class="form-control mb-0 w-100"
                          placeholder="Enter Amount"
                          @keyup="saveItem(item)"
                          v-model="item.amount"
                        />
                        <select
                          @click="saveItem(item)"
                          class="form-select"
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
                            item.selected
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
import {itemsColRef, viewsColRef} from "../firebase";
import { getDocs, doc, deleteDoc, setDoc} from "firebase/firestore";
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
      selected: "1",
      viewInfo: [],
      options: [
        { period: "Weekly", value: "52" },
        { period: "Fortnightly", value: "26" },
        { period: "Monthly", value: "12" },
        { period: "Quarterly", value: "4" },
        { period: "Annually", value: "1" },
      ],
      items: [],
      categories: [],
      itemInfo: {
        //   id: null
        //   userId: null,
        //   value: null,
        name: null,
        // amount: null,
        //   category: null,
        //   selected: null
      },
    };
  },
  watch: {},
  methods: {
    async updateView(userId, myView){

    //  console.log('s',this.selected)
// this.selected = myView
console.log("m",myView)
            const newView = {
              userId: userId,
            selected:myView,
          };
          this.viewInfo.push(newView);
                    console.log("this", this.viewInfo);
           await setDoc(viewsColRef, this.viewInfo)

       
      // let viewRef = doc(viewsColRef, item.id);
      // this.docRef = viewRef;
      // this.view = item;

      // await setDoc(this.docRef, this.itemInfo);
      // this.itemEdit = false;
    },
   async viewSelected(userId, myView){
  let view;
       console.log('creating here', myView)

 let viewSnap = await getDocs(viewsColRef, userId);
        
        //  console.log("viewSnap", viewSnap);
      viewSnap.forEach((v) => {
        console.log("viewSnapz", v);
        // if (v.data().userId === userId) {
          view = v.data().view;
          this.viewInfo = view
       console.log("view",  view)
        // }
      });
      
     

    },
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
      console.log("categories", categories);
      categories.forEach((i) => {
        i.items.forEach((ii) => {
          total += this.calcItems(ii.amount, ii.selected, this.selected);
        });
      });
      // let total=0
      //  total  += categories.value

      return total;
    },
    calcTotalItems(category) {
      let total = 0;
      category.items.forEach((i) => {
        total += this.calcItems(i.amount, i.selected, this.selected);
      });
      return total;
    },

    focus(amount, period, selected) {
      let iAmount;

      // let temp = 0

      // let a = amount.toLocaleString("en-US", {style:"currency", currency:"AUD"});
      //  temp += amount

      console.log("selected", selected);
      console.log("period", period);
      console.log("iAmount", iAmount);
      //  console.log( 'vv', new Intl.NumberFormat('en-us', { style: 'currency', currency: 'AUD' }).format(iAmount))
      // this.itemInfo.amount = iAmount.toLocaleString("en-US", {style:"currency", currency:"AUD"})
      switch (this.selected) {
        case "1":
          switch (period) {
            case "1":
              // this.cateAmount =  (amount * this.selected * period)
              return amount * this.selected * period;
            case "4":
              return ((amount * this.selected) / 4) * (period * 4);
            case "12":
              return ((amount * this.selected) / 12) * (period * 12);
            case "26":
              return ((amount * this.selected) / 26) * (period * 26);
            case "52":
              iAmount = ((amount * this.selected) / 52) * (period * 52);
              this.calcItem(iAmount);
              return iAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "AUD",
              });
          }
          break;
      }
    },
    calcCate(value) {
      console.log("tt", value);
      // return this.cateAmount
    },
    calcItems(amount, period) {
      // console.log("this.selected", this.selected);
      // console.log("period", period);
      // console.log("selected", selected);
      // console.log("amount", amount);

      switch (this.selected) {
        case "1":
          switch (period) {
            case "1":
              // this.cateAmount =  (amount * this.selected * period)
              return amount * this.selected * period;
            case "4":
              return ((amount * this.selected) / 4) * (period * 4);
            case "12":
              return ((amount * this.selected) / 12) * (period * 12);
            case "26":
              return ((amount * this.selected) / 26) * (period * 26);
            case "52":
              //  (this.itemInfo.amount)=(amount * this.selected/52 * (period * 52));
              return ((amount * this.selected) / 52) * (period * 52);
          }
          break;
        case "4":
          switch (period) {
            case "1":
              return amount * this.selected * period * 4;
            case "4":
              return ((amount * this.selected) / 4) * (period * 4);
            case "12":
              return ((amount * this.selected) / 12) * (period * 4);
            case "26":
              return ((amount * this.selected) / 26) * (period * 4);
            case "52":
              return ((amount * this.selected) / 52) * (period * 4);
          }
          break;

        case "52":
          switch (period) {
            case "1":
              this.cateAmount = (((amount * this.selected) / 52) * period) / 52;
              return (((amount * this.selected) / 52) * period) / 52;
            case "4":
              return (((amount * this.selected) / 52) * period) / 52;
            case "12":
              return (((amount * this.selected) / 52) * period) / 52;
            case "26":
              return (((amount * this.selected) / 52) * period) / 52;
            case "52":
              this.cateAmount = (((amount * this.selected) / 52) * period) / 52;
              return (((amount * this.selected) / 52) * period) / 52;
          }
          break;
      }
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
      this.itemEdit = false;
    },
    async fetchItems(userId) {
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
if (categories){
        this.categories = categories;
}

      // let categories = [];
      // let items = [];
      // let cateSnap = await getDocs(itemsColRef, userId);
      // cateSnap.forEach((cate) => {
      //   console.log("catesnap", cate.data());
      //   if (cate.data().userId === userId && !cate.data().category) {
      //     console.log("item.id", cate.id);
      //     let cateData = cate.data();
      //     cateData.id = cate.id;
      //     categories.push(cateData);
      //   }

      //   if (
      //     cate.data().userId === userId &&
      //     cate.data().category !== cate.data().id
      //   ) {
      //     let catData = cate.data();
      //     catData.id = cate.id;
      //     // this.itemInfo.amount = catData.amount
      //     // console.log("a",  this.itemInfo.amount, catData.selected);
      //     items.push(catData);
      //   }
      // });
      // this.items = items
      // this.categories = categories;

      // //        console.log(itemsSnap)
      // console.log("cate", categories);
      // console.log("item", items);

      //   let itemId = getItemId
      //     console.log('ii', itemId)
      //   let itemRef =  doc(itemsColRef, item.id)
      //       this.docRef = itemRef

      // let item = await getDoc(this.docRef, item.id)
      // console.log("item", item.data())
      // this.itemName = item.data().name
      // let itemData = item.data()
      // this.itemInfo.id = itemData.id
      // this.itemInfo.name = itemData.name
      // this.itemInfo.amount = itemData.amount
      // this.itemInfo.value = itemData.value
      // this.itemInfo.category = itemData.categoryf
      // this.itemInfo.userId = userId
      // this.iteminfo.selected = itemData.selected
      // this.itemSelected = itemData.selected
      //  this.itemId = item.id
      //     console.log("id",this.itemSelected  )
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
    this.viewSelected(userId, this.selected)
  },
};
</script>

<style></style>

<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" v-model="text" name="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        type="text"
        v-model="day"
        name="day"
        placeholder="Add Day & Time"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
let userId = uid
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  }
});
export default {
    name: 'AddTask',
    data(){
        return {
            text: "",
            day: "",
            reminder: false,
            userId: ""
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            if (!this.text){
                alert('Add Task')
                return
            }
            const newTask = {
                id: Math.floor(Math.random() * 100000000000),
                text: this.text,
                day: this.day,
                reminder: this.reminder,
                userId: userId
            }
            this.$emit('add-task', newTask)
            this.text = ""
            this.day = ""
            this.reminder = false
            this.userId = ""
        }
    }
}
</script>
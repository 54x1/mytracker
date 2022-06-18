<template>
  <div @dblclick="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task']">
    <h3>{{task.id}}
    <i @click="$emit('delete-task', task.id)" class="fas fa-times text-danger"></i>
    </h3>

  </div>
</template>

<script>

export default{
    name: 'Task',
    props: {
      task: Object   
    }
}
</script>

<style scoped>
.fa-times {
  cursor: pointer;
}
.task.reminder{
  border-left: 5px solid green;
}
</style>
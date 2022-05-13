<template>
  <div>
    <input
      type="text"
      placeholder="Create New Todo List"
      v-model="todoListName"
      @keypress.enter="handleCreateNewTodo"
    />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { TodoList } from "../models/TodoList";

export default class CreateNewTodoList extends Vue {
  todoListName = "";

  handleCreateNewTodo() {
    if (this.todoListName.length > 0) {
      this.$emit("addNewTodoList", new TodoList(this.todoListName));
      this.todoListName = "";
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  padding: 7px;
  margin-bottom: 20px;
  border: none;
  min-width: 365px;
  width: 100%;
  min-width: 375;
  border-bottom: 1px solid gray;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  font-size: 16px;
  background: #f8f8f8;
}
</style>

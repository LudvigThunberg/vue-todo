<template>
  <div>
    <div>
      <label for="todo-input">Add New Todo</label>
      <input
        type="text"
        name="todo-input"
        v-model="todoInput"
        @keypress.enter="handleAddTodo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Todo } from "../models/Todo";
export default class TodoInput extends Vue {
  todoInput = "";
  todo!: Todo;
  todoList: Todo[] = [];

  handleAddTodo() {
    if (this.todoInput.length > 0) {
      this.todo = new Todo(this.todoInput);
      this.todoList.push(this.todo);
      console.log(this.todoList);
      this.todoInput = "";
    }
  }
}
</script>

<style lang="scss" scoped></style>

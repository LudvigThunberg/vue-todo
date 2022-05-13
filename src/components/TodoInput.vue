<template class="input-container">
  <div class="input-container">
    <input
      type="text"
      placeholder="New Todo"
      v-model="todoInput"
      @keypress.enter="handleAddTodo"
    />
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Todo } from "../models/Todo";

export default class TodoInput extends Vue {
  todoInput = "";
  @Prop() currentListId!: number;
  listId = 0;

  handleAddTodo() {
    if (this.todoInput.length > 0) {
      this.$emit("addTodo", new Todo(this.todoInput));
      this.todoInput = "";
    }
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  width: 100%;
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
    &:focus {
      outline: none;
    }
  }
}
</style>

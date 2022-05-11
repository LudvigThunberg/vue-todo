<template>
  <div class="todo-container">
    <p>{{ todo.todo }}</p>
    <div class="controls-container">
      <div v-if="todo.done" @click="markAsDone">
        <i class="bi bi-check-square"></i>
      </div>
      <div v-else @click="markAsDone">
        <i class="bi bi-square"></i>
      </div>
      <div @click="moveUp">
        <i class="bi bi-arrow-up-square"></i>
      </div>
      <div @click="moveDown">
        <i class="bi bi-arrow-down-square"></i>
      </div>
      <div @click="deleteTodo">
        <i class="bi bi-trash"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Todo } from "../models/Todo";

export default class TodoSingle extends Vue {
  @Prop() todo!: Todo;
  button = "undone";
  isActive = true;

  markAsDone() {
    this.$emit("toggleDone", this.todo.id);

    this.isActive = !this.isActive;
    if (this.isActive) {
      this.button = "undone";
    } else {
      this.button = "done";
    }
  }

  deleteTodo() {
    this.$emit("deleteTodo", this.todo.id);
  }

  moveUp() {
    this.$emit("moveUp", this.todo.id);
  }

  moveDown() {
    this.$emit("moveDown", this.todo.id);
  }
}
</script>

<style lang="scss" scoped>
.todo-container {
  min-width: 365px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
  }
  .controls-container {
    display: flex;
    gap: 10px;
    div {
      .bi {
        font-size: 1.2rem;
      }
    }
  }
}
</style>

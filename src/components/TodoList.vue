<template>
  <div>
    <TodoInput @addTodo="addTodoToList($event)" />
    <transition-group>
      <div v-for="li in todoList" :key="li.id">
        <TodoSingle
          :todo="li"
          @toggleDone="toggleDone($event)"
          @deleteTodo="deleteTodo($event)"
          @doToday="doToday($event)"
          @moveUp="moveUp($event)"
          @moveDown="moveDown($event)"
        />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Todo } from "../models/Todo";
import TodoInput from "./TodoInput.vue";
import TodoSingle from "./TodoSingle.vue";
import { LocalStorageService } from "../services/LocalStorageService";

@Options({
  components: {
    TodoInput,
    TodoSingle,
  },
})
export default class TodoList extends Vue {
  service = new LocalStorageService();
  todoList: Todo[] = [];

  mounted() {
    this.todoList = this.service.getFromLocalStorage();
  }

  addTodoToList(recivedTodo: Todo) {
    this.todoList.push(recivedTodo);
    console.log(recivedTodo);
    this.service.sendToLocalStorage(this.todoList);
  }

  toggleDone(todoId: number) {
    let todo = this.todoList.find((todo) => todo.id === todoId);
    if (todo) {
      todo.done = !todo.done;
      this.service.sendToLocalStorage(this.todoList);
    }
  }

  deleteTodo(todoId: number) {
    let index = this.todoList.findIndex((todo) => todo.id === todoId);
    this.todoList.splice(index, 1);
    this.service.sendToLocalStorage(this.todoList);
  }

  moveUp(todoId: number) {
    let fromIndex = this.todoList.findIndex((todo) => todo.id === todoId);
    if (fromIndex >= 1) {
      let toIndex = fromIndex - 1;
      let element = this.todoList.splice(fromIndex, 1)[0];
      this.todoList.splice(toIndex, 0, element);
      this.service.sendToLocalStorage(this.todoList);
    }
  }

  moveDown(todoId: number) {
    let fromIndex = this.todoList.findIndex((todo) => todo.id === todoId);
    if (fromIndex < this.todoList.length - 1) {
      let toIndex = fromIndex + 1;
      let element = this.todoList.splice(fromIndex, 1)[0];
      this.todoList.splice(toIndex, 0, element);
      this.service.sendToLocalStorage(this.todoList);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

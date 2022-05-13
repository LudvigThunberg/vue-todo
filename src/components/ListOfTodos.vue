<template>
  <div>
    <div v-if="listOfTodoLists.length > 0">
      <TodoInput @addTodo="addTodoToList($event)" />
      <transition-group>
        <h2>{{ todoList.todoListName }}</h2>
        <div v-for="li in todoList.todo" :key="li.id">
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
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Todo } from "../models/Todo";
import TodoInput from "./TodoInput.vue";
import TodoSingle from "./TodoSingle.vue";
import { LocalStorageService } from "../services/LocalStorageService";
import { TodoList } from "../models/TodoList";

@Options({
  components: {
    TodoInput,
    TodoSingle,
  },
})
export default class ListOfTodos extends Vue {
  service = new LocalStorageService();
  @Prop() todoList!: TodoList;
  @Prop() listOfTodoLists!: TodoList[];

  addTodoToList(recivedTodo: Todo) {
    this.todoList.todo.push(recivedTodo);
    console.log(this.todoList);

    this.service.sendListOfTodoListsToLocalStorage(this.listOfTodoLists);
  }

  toggleDone(todoId: number) {
    let todo = this.todoList.todo.find((todo) => todo.id === todoId);
    if (todo) {
      todo.done = !todo.done;
      this.service.sendListOfTodoListsToLocalStorage(this.listOfTodoLists);
    }
  }

  deleteTodo(todoId: number) {
    console.log("Removing single todo");

    let index = this.todoList.todo.findIndex((todo) => todo.id === todoId);
    this.todoList.todo.splice(index, 1);
    this.service.sendListOfTodoListsToLocalStorage(this.listOfTodoLists);
  }

  moveUp(todoId: number) {
    let fromIndex = this.todoList.todo.findIndex((todo) => todo.id === todoId);
    if (fromIndex >= 1) {
      let toIndex = fromIndex - 1;
      let element = this.todoList.todo.splice(fromIndex, 1)[0];
      this.todoList.todo.splice(toIndex, 0, element);
      this.service.sendListOfTodoListsToLocalStorage(this.listOfTodoLists);
    }
  }

  moveDown(todoId: number) {
    let fromIndex = this.todoList.todo.findIndex((todo) => todo.id === todoId);
    if (fromIndex < this.todoList.todo.length - 1) {
      let toIndex = fromIndex + 1;
      let element = this.todoList.todo.splice(fromIndex, 1)[0];
      this.todoList.todo.splice(toIndex, 0, element);
      this.service.sendListOfTodoListsToLocalStorage(this.listOfTodoLists);
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="listOfLists-container">
    <div class="left-container">
      <CreateNewTodoList @addNewTodoList="createNewTodoList($event)" />
      <div class="list-of-todo-list" v-if="listOfTodoLists.length > 0">
        <div
          class="List-item-container"
          v-for="(list, i) in listOfTodoLists"
          :key="list.listId"
        >
          <div class="list-item" @click="loadTodoList(list.listId)">
            <p>{{ list.todoListName }}</p>
            <div @click="deleteTodoList(i)">
              <i class="bi bi-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ListOfTodos :todoList="todoList" :listOfTodoLists="listOfTodoLists" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { TodoList } from "../models/TodoList";
import CreateNewTodoList from "./CreateNewTodoList.vue";
import { LocalStorageService } from "../services/LocalStorageService";
import ListOfTodos from "./ListOfTodos.vue";

@Options({
  components: {
    CreateNewTodoList,
    ListOfTodos,
  },
})
export default class ListOfTodoLists extends Vue {
  service = new LocalStorageService();
  listOfTodoLists: TodoList[] = [];
  todoList: TodoList = { listId: 0, todo: [], todoListName: "" };

  mounted() {
    this.listOfTodoLists = this.service.getListOfTodoListsFromLocalStorage();
  }

  createNewTodoList(newList: TodoList) {
    this.listOfTodoLists.push(newList);
    this.todoList = newList;
    this.service.sendListOfTodoListsToLocalStorage(this.listOfTodoLists);
  }

  loadTodoList(listId: number) {
    this.todoList = this.listOfTodoLists.find(
      (list) => list.listId === listId
    ) as TodoList;
  }

  deleteTodoList(index: number) {
    console.log("Removing list");

    this.listOfTodoLists.splice(index, 1);
    this.service.sendListOfTodoListsToLocalStorage(this.listOfTodoLists);
    if (this.listOfTodoLists.length > 0) {
      this.todoList = this.listOfTodoLists[0];
    } else {
      this.listOfTodoLists = [];
      this.todoList = { listId: 0, todo: [], todoListName: "" };
    }
  }
}
</script>

<style lang="scss" scoped>
.listOfLists-container {
  width: 100%;
  display: flex;
  gap: 10px;
  .list-of-todo-list {
    .List-item-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .list-item {
        padding: 4px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        p {
          margin: 0;
        }
      }
    }
  }
}
@media only screen and (max-width: 800px) {
  .listOfLists-container {
    flex-direction: column;
  }
}
</style>

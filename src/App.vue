<template>
  <div>
    <h1 class="todo-heading">Things To Do</h1>
    <TodoList class="container" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList.vue";

@Options({
  components: {
    TodoList,
  },
})
export default class App extends Vue {
  todo!: Todo;
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  color: #2c3e50;
  font-size: 16px;
  height: 100vh;
  background: #efefef;
  div {
    .todo-heading {
      text-align: center;
    }
    .container {
      background: #f8f8f8;
      min-width: 375px;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid gray;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 3px 3px 8px gray;
    }
  }
}
</style>

import { Todo } from "../models/Todo";
import { TodoList } from "../models/TodoList";

export class LocalStorageService {
  sendToLocalStorage(todoList: Todo[]) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  getFromLocalStorage() {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem("todoList") || "[]"
    );
    return todoList;
  }

  sendListOfTodoListsToLocalStorage(listOfTodoLists: TodoList[]) {
    localStorage.setItem("listOfTodoLists", JSON.stringify(listOfTodoLists));
  }

  getListOfTodoListsFromLocalStorage() {
    const listOfTodoLists: TodoList[] = JSON.parse(
      localStorage.getItem("listOfTodoLists") || "[]"
    );
    return listOfTodoLists;
  }
}

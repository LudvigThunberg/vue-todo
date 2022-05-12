import { Todo } from "../models/Todo";
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
}

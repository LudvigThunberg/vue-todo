import { Todo } from "./Todo";

export class TodoList {
  listId: number;
  todo: Todo[];
  constructor(public todoListName: string) {
    this.listId = new Date().getTime();
    this.todo = [];
  }
}

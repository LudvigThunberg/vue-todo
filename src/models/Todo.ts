export class Todo {
  done: boolean;
  id: number;
  constructor(public todo: string) {
    this.done = false;
    this.id = new Date().getTime();
  }
}

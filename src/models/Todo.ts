export class Todo {
  done: boolean;
  today: boolean;
  constructor(public todo: string) {
    this.done = false;
    this.today = false;
  }
}

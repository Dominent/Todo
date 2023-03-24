import {TodoStatus} from "@todo/models/todo.models"

export const todos = [
    {
      id: 1,
      name: 'My first todo',
      status: TodoStatus.Complete
    },
    {
      id: 2,
      name: 'My second todo',
      status: TodoStatus.InProgress
    }
  ]
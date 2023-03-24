import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '@todo/models/todo.models';
import { TodoStoreFacadeService } from '@todo/store/todo-store-facade.service';

@Component({
  selector: 'app-todo-edit-dialog',
  templateUrl: './todo-edit-dialog.component.html',
  styleUrls: ['./todo-edit-dialog.component.css'],
})
export class TodoEditDialogComponent {
  public newName: string;
  public todo: Todo;

  constructor(
    public dialogRef: MatDialogRef<TodoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo }
  ) {
    this.todo = data?.todo;
    this.newName = data?.todo?.name;
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public changeTodoName(name: string): void {
    this.dialogRef.close({id: this.todo.id, name});
  }
}

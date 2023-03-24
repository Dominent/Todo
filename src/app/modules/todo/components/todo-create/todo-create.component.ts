import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  public todoFormGroup: FormGroup;

  @Output()
  public addTodo: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public ngOnInit(): void {
    this.initializeFormGroup();
  }

  public initializeFormGroup() {
    this.todoFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }

  public handleAddTodo({ name }: { name: string }) {
    this.addTodo.emit(name);
  }
}

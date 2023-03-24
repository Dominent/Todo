import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockDeclaration, MockModule } from 'ng-mocks';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoComponent } from '@todo/todo.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoStoreFacadeService } from './store/todo-store-facade.service';
import { of } from 'rxjs';
import { todos } from '@todo/stubs/todo.stubs';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoComponent,
        MockDeclaration(TodoListComponent),
        MockDeclaration(TodoCreateComponent),
      ],
      imports: [
        MockModule(MatProgressBarModule),
        MockModule(MatDialogModule),
        MockModule(MatTabsModule),
      ],
      providers: [
        {
          provide: TodoStoreFacadeService,
          useValue: {
            actions: {
              getTodos: () => {},
              changeTodoName: () => {},
              changeTodoStatus: () => {},
              addTodo: () => {},
              removeTodo: () => {},
            },
            selectors: {
              todoList$: of(todos),
              changeTodoNameLoading$: of(false),
              changeTodoStatusLoading$: of(false),
              getTodosLoading$: of(false),
              removeTodoLoading$: of(false),
              addTodoLoading$: of(false),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MockModule } from 'ng-mocks';
import { TodoEditDialogComponent } from './todo-edit-dialog.component';

describe('EditTodoDialogComponent', () => {
  let component: TodoEditDialogComponent;
  let fixture: ComponentFixture<TodoEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoEditDialogComponent],
      imports: [MockModule(MatDialogModule)],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

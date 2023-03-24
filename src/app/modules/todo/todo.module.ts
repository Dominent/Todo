import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TODO_FEATURE_KEY, reducer } from '@todo/store/todo.reducer';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TodoComponent } from '@todo/todo.component';
import { TodoCreateComponent } from '@todo/components/todo-create/todo-create.component';
import { TodoEditDialogComponent } from '@todo/components/todo-edit-dialog/todo-edit-dialog.component';
import { TodoEffects } from '@todo/store/todo.effects';
import { TodoListComponent } from '@todo/components/todo-list/todo-list.component';
import { TodoRoutingModule } from '@todo/todo-routing.module';

const material = [
  MatTabsModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoEditDialogComponent,
    TodoCreateComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
    EffectsModule.forFeature([TodoEffects]),
    ...material,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TodoModule {}

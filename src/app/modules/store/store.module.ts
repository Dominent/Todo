import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TODO_FEATURE_KEY, reducer } from './todo/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoEffects } from './todo/todo.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const material = [MatSnackBarModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
    EffectsModule.forFeature([TodoEffects]),
    ...material
  ],
})
export class StoreModule {}

import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

const material = [
    MatDialogModule,
    MatButtonModule
];

const components = [ConfirmationDialogComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, ...material],
  exports: components,
})
export class SharedModule {}

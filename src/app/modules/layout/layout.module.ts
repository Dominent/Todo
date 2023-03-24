import { CommonModule } from '@angular/common';
import {HeaderComponent} from '@layout/components/header/header.component';
import { LayoutComponent } from '@layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

const material = [
  MatToolbarModule
]

const components = [
  HeaderComponent
]

@NgModule({
  imports: [
    CommonModule,
    ...material
  ],
  declarations: [LayoutComponent, ...components],
  exports: [LayoutComponent]
})
export class LayoutModule { }

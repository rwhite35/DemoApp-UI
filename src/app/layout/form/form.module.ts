import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
      CommonModule,
      FormRoutingModule,
      PageHeaderModule,
      ReactiveFormsModule
    ],
    declarations: [
      FormComponent
    ]
})
export class FormModule {}

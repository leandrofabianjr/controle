import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';

@NgModule({
  declarations: [FormControlErrorComponent],
  exports: [FormControlErrorComponent],
  imports: [CommonModule, MatInputModule],
})
export class SharedModule {}

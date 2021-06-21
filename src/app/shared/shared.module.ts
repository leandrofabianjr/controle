import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { DebounceSearchingDirective } from './directives/debounce-searching.directive';

@NgModule({
  declarations: [FormControlErrorComponent, DebounceSearchingDirective],
  exports: [FormControlErrorComponent, DebounceSearchingDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})
export class SharedModule {}

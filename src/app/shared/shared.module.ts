import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { DebounceSearchingDirective } from './directives/debounce-searching.directive';
import { DropdownWithCreationComponent } from './components/dropdown-with-creation/dropdown-with-creation.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    FormControlErrorComponent,
    DebounceSearchingDirective,
    DropdownWithCreationComponent,
  ],
  exports: [
    FormControlErrorComponent,
    DebounceSearchingDirective,
    DropdownWithCreationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}

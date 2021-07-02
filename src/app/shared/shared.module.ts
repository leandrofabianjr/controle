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
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    FormControlErrorComponent,
    DebounceSearchingDirective,
    DropdownWithCreationComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
  ],
  exports: [
    FormControlErrorComponent,
    DebounceSearchingDirective,
    DropdownWithCreationComponent,
    LoadingComponent,
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
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
})
export class SharedModule {}

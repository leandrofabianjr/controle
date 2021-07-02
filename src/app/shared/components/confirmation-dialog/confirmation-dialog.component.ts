import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  cancelButtonLabel = 'Cancelar';
  okButtonLabel = 'Ok';

  constructor(@Inject(MAT_DIALOG_DATA) public message: string) {}

  ngOnInit(): void {}
}

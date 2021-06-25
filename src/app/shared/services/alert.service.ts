import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  _buildAlert(type: 'success' | 'error', message: string) {
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 7000,
      panelClass: `alert-${type}`,
    });
  }

  success(message: string) {
    this._buildAlert('success', message);
  }

  error(message: string) {
    this._buildAlert('error', message);
  }
}

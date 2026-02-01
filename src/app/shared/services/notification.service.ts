import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private show(message: string, panelClass: string, duration = 3000) {
    const config: MatSnackBarConfig = {
      duration,
      panelClass,
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top'     // 'top' | 'bottom'
    };
    this.snackBar.open(message, '✖', config);
  }

  showError(message: string) {
    this.show(message, 'error-snackbar');
  }

  showSuccess(message: string) {
    this.show(message, 'success-snackbar', 2000);
  }
}

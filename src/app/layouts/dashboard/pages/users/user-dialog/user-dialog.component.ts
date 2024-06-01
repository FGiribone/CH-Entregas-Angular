import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Iusuario } from '../../../../../Models/usuario.models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['././user-dialog.component.scss']
})
export class UserDialogComponent {
  user: Iusuario;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Iusuario }
  ) {
    this.user = { ...data.user };
  }

  saveChanges(): void {
    this.dialogRef.close(this.user); 
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
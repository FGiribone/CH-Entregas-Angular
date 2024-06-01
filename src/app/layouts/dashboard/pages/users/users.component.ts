import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormComponent } from '../../../../components/reactive-form/reactive-form.component';
import { FormDataService } from '../../pages/form-data.service';
import { Iusuario } from '../../../../Models/usuario.models';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { DataService } from '../../../../shared//data-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'userLastName', 'userEmail', 'userCity', 'userProvince', 'userAddress','userCurso', 'actions'];  
  
  users: Iusuario[] =[];


  constructor(
    private formDataService: FormDataService,
    private dialog: MatDialog,
    private dataService: DataService
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReactiveFormComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: Iusuario): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { user },
    });
  
    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.users = this.users.map(u => u.id === updatedUser.id ? updatedUser : u);
      }
    });
  }
  
  deleteUser(userId: number): void {
    if (confirm('¿Está seguro?')) {
      this.users = this.users.filter(u => u.id !== userId);
    }
  }
}
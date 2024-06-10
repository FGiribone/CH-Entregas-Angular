import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../shared/data-service';
import { Iusuario } from '../../../../Models/usuario.models';
import { AuthState } from '../../../../store/auth/auth.reducer';
import { ReactiveFormComponent } from '../../../../components/reactive-form/reactive-form.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'userLastName', 'userEmail', 'userCity', 'userProvince', 'userAddress', 'userCurso', 'actions'];
  users: Iusuario[] = [];
  currentUser$: Observable<Iusuario | null>;
  isAdmin = false;

  constructor(
    private dataService: DataService,
    private store: Store<{ auth: AuthState }>,
    private dialog: MatDialog
  ) {
    this.currentUser$ = this.store.select(state => state.auth.authUser);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.checkIfAdmin();
  }

  checkIfAdmin(): void {
    this.currentUser$.pipe(take(1)).subscribe(currentUser => {
      this.isAdmin = currentUser?.role === 'ADMIN';
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReactiveFormComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: Iusuario): void {
    if (!this.isAdmin) {
      alert('No tienes permiso para editar usuarios.');
      return;
    }

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { user },
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.dataService.updateUser(updatedUser).subscribe(() => {
          this.users = this.users.map(u => u.id === updatedUser.id ? updatedUser : u);
        });
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('¿Está seguro?')) {
      this.dataService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(u => u.id !== userId);
      });
    }
  }
}

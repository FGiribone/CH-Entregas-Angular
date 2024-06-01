import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReactiveFormComponent } from '../../components/reactive-form/reactive-form.component';
import { authUser, isLoggedIn } from '../../store/auth/auth.selectors';
import { AuthState } from '../../store/auth/auth.reducer';
import { authActions } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  username: string = '';
  userSubscription: Subscription | undefined;
  loginSubscription: Subscription | undefined;

  constructor(
    private store: Store<AuthState>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(authUser).subscribe((user) => {
      this.username = user ? user.userName : '';
    });

    this.loginSubscription = this.store.select(isLoggedIn).subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  openDialog(): void {
    this.dialog.open(ReactiveFormComponent, {
      data: {}
    });
  }

  openAuth(): void {
    this.router.navigate(['/auth']);
  }
}

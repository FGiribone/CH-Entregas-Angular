import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthState } from '../../store/auth/auth.reducer';
import { authActions } from '../../store/auth/auth.actions';
import { authUser } from '../../store/auth/auth.selectors';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;
  loggedIn: boolean = false;
  username: string = '';
  userSubscription: Subscription | undefined;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select(authUser).subscribe(
      (user) => {
        this.loggedIn = !!user;
        this.username = user ? user.userName : '';
      }
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  
login() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
  } else {
    const { email, password } = this.loginForm.getRawValue();
    this.store.dispatch(authActions.login({ payload: { email, password } }));
    this.router.navigate(['/home']);
  }
}

  logout() {
    this.store.dispatch(authActions.logout());
  }
}
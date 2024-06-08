import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from './store/auth/auth.reducer';
import { isLoggedIn } from './store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn: Observable<boolean>;
  private userSubscription: Subscription | undefined;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.loggedIn = this.store.select(isLoggedIn);
  }

  ngOnInit(): void {
    this.userSubscription = this.loggedIn.subscribe(logged => {
      console.log('User logged in state:', logged);
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
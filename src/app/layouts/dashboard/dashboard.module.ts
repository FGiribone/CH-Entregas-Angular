import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [CommonModule,DashboardRoutingModule,UsersModule],
  exports: [DashboardComponent],
})
export class DashboardModule { }

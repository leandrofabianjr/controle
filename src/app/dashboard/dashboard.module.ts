import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthModule } from '../auth/auth.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AuthModule,
    SidenavModule,
    MatIconModule,
  ],
})
export class DashboardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthModule } from '../auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AuthenticatedComponent, MenuComponent],
  imports: [
    CommonModule,
    AuthModule,
    AuthenticatedRoutingModule,
    SidenavModule,
    DashboardModule,
    MatListModule,
  ],
})
export class AuthenticatedModule {}

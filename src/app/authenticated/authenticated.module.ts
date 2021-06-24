import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthModule } from '../auth/auth.module';
import { AuthenticatedComponent } from './authenticated.component';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [AuthenticatedComponent, SidenavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    AuthModule,
    AuthenticatedRoutingModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class AuthenticatedModule {}

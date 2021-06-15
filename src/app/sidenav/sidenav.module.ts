import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthModule } from '../auth/auth.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavListComponent } from './nav-list/nav-list.component';

@NgModule({
  declarations: [SidenavComponent, ToolbarComponent, NavListComponent],
  imports: [
    CommonModule,
    LayoutModule,
    AuthModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [SidenavComponent, ToolbarComponent],
})
export class SidenavModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotAuthGuard } from './shared/guards/not-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NotAuthGuard],
    component: LoginComponent,
  },
  {
    path: 'u',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./authenticated/authenticated.module').then(
        (m) => m.AuthenticatedModule
      ),
  },
  {
    path: '**',
    redirectTo: 'u',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

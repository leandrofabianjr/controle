import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: '',
        loadChildren: () => {
          console.log('dashboard route');
          return import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          );
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}

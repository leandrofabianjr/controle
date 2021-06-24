import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss'],
})
export class AuthenticatedComponent {
  menuItems = [
    { label: 'Início', route: '' },
    { label: 'Encomendas', route: 'orders' },
  ];

  constructor() {}
}

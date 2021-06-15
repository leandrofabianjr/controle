import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    console.log('vai sair');
    this.authService.logout();
  }
}

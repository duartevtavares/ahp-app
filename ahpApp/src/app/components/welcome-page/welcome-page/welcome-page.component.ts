import { Component, OnInit } from '@angular/core';
import { LoginPermissionServiceService } from 'src/app/services/login-permission-service.service';

@Component({
  selector: 'welcome-page-component',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  constructor(private permissionService: LoginPermissionServiceService) {}

  isAdmin(role: boolean) {
    this.permissionService.isAdmin = role;
    console.log(role);
  }
}

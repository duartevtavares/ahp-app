import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoginPermissionServiceService } from 'src/app/services/login-permission-service.service';

@Component({
  selector: 'welcome-page-component',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  users!: any[];

  constructor(
    private permissionService: LoginPermissionServiceService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }

  isAdmin(role: boolean, id: number) {
    this.permissionService.isAdmin = role;
    this.permissionService.userId = id;
    console.log(role);
    console.log(id);
  }
}

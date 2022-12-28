import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginPermissionServiceService {
  isAdmin: boolean = false;
  userId!: number;
}

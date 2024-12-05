import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  userType: string | null = null; // Initialize with null

  constructor(private router: Router) {}

  register() {
    if (!this.userType) {
      console.log('Please select a user type.');
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      userType: this.userType // Use the selected user type
    };
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User registered:', user);
    this.router.navigate(['/']);
  }

  setUserType(userType: string) {
    this.userType = userType;
    localStorage.setItem('usertype', userType);
    console.log(`User type set to ${userType}`);
  }
}



import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userForm!: FormGroup;
  userDetails: any;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpService, private notification: NotificationService) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.http.doGet(`users/${localStorage.getItem('id')}`).subscribe((res)=>{
      this.userDetails = res.user; // API returns user object directly

      // Initialize form with user details
      this.userForm = this.fb.group({
        id: [this.userDetails.id],
        email: [this.userDetails.email],
        first_name: [this.userDetails.first_name],
        last_name: [this.userDetails.last_name],
        role: [this.userDetails.role],
        status: [this.userDetails.status]
      });
    });
  }

  editUser() {
    this.isEditing = true;
  }

  submitUser() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
    this.http.doUpdate(`users/${this.userDetails.id}`, updatedUser).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Debugging
    
        if (response && response.message) {
          this.notification.showSucessNotification('', response.message);
          this.userDetails = { ...this.userDetails, ...updatedUser };
          this.isEditing = false;
        } else {
          this.notification.showErrorNotification('', response.errorMessage || 'An error occurred');
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this.notification.showErrorNotification('', err.error?.message || 'Failed to update user');
      }
    });
  }
    
  }

  cancelEdit() {
    this.isEditing = false;
  } 
}


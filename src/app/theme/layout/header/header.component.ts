import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
declare var bootstrap: any; // Ensure Bootstrap JS is available

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName :any;
  passwordForm: FormGroup;
  @ViewChild('exampleModal', { static: false }) modalRef!: ElementRef;
  modalInstance: any;
  role:any;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private notification: NotificationService) {
    this.passwordForm = this.fb.group({
      old_password: '',
      new_password: '',
      user_id: localStorage.getItem('user_id')
    })
    this.userName = localStorage.getItem('name')
    this.role = localStorage.getItem('role')
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

 


  submit() {
    this.http.post<any>("http://localhost:8080/change-password", this.passwordForm.value).pipe(
      catchError((error: HttpErrorResponse) => (error.status === 400 ? this.notification.showErrorNotification('', error.error?.message || 'Bad Request') : null, throwError(() => error)))
    ).subscribe(res => res?.errorMessage ? this.notification.showErrorNotification('', res.errorMessage) : this.notification.showSucessNotification('', 'Password Changed Successfully'));
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide(); // Close modal using Bootstrap API
    }
  
  }



}

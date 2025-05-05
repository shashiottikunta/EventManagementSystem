import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  studentForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private notification: NotificationService,
    private router: Router) {
      this.studentForm = this.fb.group({
        first_name: ['',],
        last_name: ['',],
        email: ['',],
        password: ['',],
        role: ['',]
      });
  }
  submit(){
    this.http.post<any>("http://localhost:8001/users/register", this.studentForm.value)
    .subscribe(res => {
      if(res.errorMessage){
        this.notification.showErrorNotification('',res.errorMessage)
      }else{
        this.notification.showSucessNotification('',res.message)
        this.router.navigate(['/login'])
      }
    })  
  }
}

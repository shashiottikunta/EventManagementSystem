import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup<any>;

  constructor(private fb:FormBuilder, private http:HttpClient, private notification:NotificationService,
    private router:Router,
  ){ {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  }

  login(){
    this.http.post<any>("http://localhost:8001/users/login", this.loginForm.value)
    .subscribe(res => {
      if(res.errorMessage){
        this.notification.showErrorNotification('',res.errorMessage)
      }else{
        localStorage.setItem('email', res.email);
        localStorage.setItem('id', res.id);
        localStorage.setItem('role', res.role);
        localStorage.setItem('name', `${res.first_name} ${res.last_name}`);
        localStorage.setItem('access_token', res.access_token);
        if(res.role == 'Admin' ){
          this.notification.showSucessNotification('','Login Successfully');

          this.router.navigate(['/users-list'])
      }else if(res.role == 'Organizer'){
        this.notification.showSucessNotification('','Login Successfully');
        this.router.navigate(['/events'])

      }else if(res.role == 'Participant'){
        this.notification.showSucessNotification('','Login Successfully');

        this.router.navigate(['/events'])
      }

    }  
    })
  }

}

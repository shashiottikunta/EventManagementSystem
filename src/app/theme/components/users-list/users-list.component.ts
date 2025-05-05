import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  usersList:any;
  isSidebarOpen = false; 
  selectedUser: any = null;
  userDetails:any;
  userForm:FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private readonly router: Router, private notification: NotificationService) {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name:[''],
      email: [''],
      role:[''],
      status:[''],
      id:['']

    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.doGet('users').subscribe((res)=>{
      this.usersList = res.users
    })
  }

  openSidebar(user: any) {
    console.log(user)
    this.selectedUser = { ...user }; 
    this.isSidebarOpen = true; 
    this.http.doGet(`users/${user.id}`).subscribe((res)=>{
      this.userDetails = res.user;
      this.userForm.patchValue({
        first_name: this.userDetails?.first_name,
        last_name:this.userDetails?.last_name,
        email:this.userDetails?.email,
        role:this.userDetails?.role,
        status:this.userDetails?.status,
        id : this.userDetails?.id
      })
    })

  }

  closeSidebar() {
    this.isSidebarOpen = false; 
    this.selectedUser = null; 
  }

  updateData(){
    this.http.doUpdate(`users/${ this.userDetails.id}`, this.userForm.value).subscribe((res)=>{
      if(res.errorMessage){
        this.notification.showErrorNotification('',res.errorMessage)
      }else{
        this.notification.showSucessNotification('', res.message);
        this.closeSidebar();

      }
    })
    
  }


 
   
  
}

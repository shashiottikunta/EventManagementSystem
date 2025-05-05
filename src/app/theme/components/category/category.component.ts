import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoryList:any;
  isSidebarOpen = false; 
  selectedUser: any = null;
  showAdd:Boolean = false;

  userDetails:any;
  categoryForm:FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private readonly router: Router, private notification: NotificationService) {
 this.categoryForm = this.fb.group({
  name:[''],
  description:[''],
  status:['',]

 })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.doGet('categories').subscribe((res)=>{
      this.categoryList = res.categories
    })
  }

  openSidebar(user: any, type:any) {
    this.isSidebarOpen = true;
    if(type == 'add'){
      this.showAdd = true
    }else{ 
      this.selectedUser = { ...user }; 
      this.http.doGet(`categories/${user.id}`).subscribe((res)=>{
        this.userDetails = res.categories;
        this.categoryForm.patchValue({
          name: this.userDetails?.name,
          description:this.userDetails?.description,
          status:this.userDetails?.status,
        })
      })
    }
   
  }

  updateData(){
    if(this.showAdd){
      this.http.doPost('categories', this.categoryForm.value).subscribe((res)=>{
        if(res.errorMessage){
          this.notification.showErrorNotification('',res.errorMessage)
        }else{
          this.notification.showSucessNotification('', res.message);
          this.closeSidebar();
          this.getData();
        }
      })

    }else{
      this.http.doUpdate(`categories/${ this.userDetails.id}`, this.categoryForm.value).subscribe((res)=>{
        if(res.errorMessage){
          this.notification.showErrorNotification('',res.errorMessage)
        }else{
          this.notification.showSucessNotification('', res.message);
          this.closeSidebar();
          this.getData();

        }
      })
     
    }

  }

  closeSidebar(){
    this.isSidebarOpen = false; 
    this.selectedUser = null; 
    this.showAdd = false;
  }

}

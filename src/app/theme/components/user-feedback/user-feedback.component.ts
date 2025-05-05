import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent {
  feedbackList:any;
  eventsList:any;
    constructor(private fb: FormBuilder, private http: HttpService, private notification: NotificationService) {
  
    }


    ngOnInit(): void {
      this.getData();
    }
  
    getData() {
      this.http.doGet(`user/${localStorage.getItem('id')}/events`).subscribe((res) => {
        this.eventsList = res.events
      })
    }

    
  openSidebar(event: any) {
    this.http.doGet(`events/${event.id}/feedback`).subscribe((res) => {
      this.feedbackList = res.feedback;
      

    })
  }

}

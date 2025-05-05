import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-user-event-registrations',
  templateUrl: './user-event-registrations.component.html',
  styleUrls: ['./user-event-registrations.component.css']
})
export class UserEventRegistrationsComponent {
  eventsList: any;
  userDetails:any;
  registered:any;
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
      this.http.doGet(`events/${event.id}/registrations`).subscribe((res) => {
        this.userDetails = res.registrations;
        

      })

    

  }


}

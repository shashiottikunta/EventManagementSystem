import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent {
  myevEntsList: any;
  eventData: any;
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private notification: NotificationService) {

    this.feedbackForm = this.fb.group({
      rating: [5, Validators.required], // Default to 5 stars
      comments: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    let roleId = localStorage.getItem('id')
    this.http.doGet(`users/${roleId}/registrations`).subscribe((res) => {
      this.myevEntsList = res.registrations
    })
  }


  openSidebar(event: any) {
    this.eventData = event;
  }


  submitFeedback() {
    if (this.feedbackForm.valid) {
      const feedbackPayload = this.feedbackForm.value;
      const eventId = this.eventData?.event?.id;
      const url = `events/${eventId}/feedback`; // Update with actual API URL

      this.http.doPost(url, feedbackPayload).subscribe(
        (response: any) => {
          this.notification.showSucessNotification('', response.message);
          this.feedbackForm.reset(); // Clear form after submission
        },
        (error) => {
          alert('Error submitting feedback. Please try again.');
        }
      );
    }
  }


}

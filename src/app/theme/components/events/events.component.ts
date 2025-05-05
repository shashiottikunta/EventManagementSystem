import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  eventForm: FormGroup;
  eventsList: any;
  isSidebarOpen = false;
  selectedUser: any = null;
  showAdd: Boolean = false;
  role: any;
  userDetails: any;
  categoryList: any;
  selectedTicketId: number | null = null; // Store the selected ticket ID
  eventID:any;
  registered:any;
  ticketForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private readonly router: Router, private notification: NotificationService) {
    this.eventForm = this.fb.group({
      title: [''],
      description: [''],
      from_date: [''],
      to_date: [''],
      languages: [''],
      location: [''],
      capacity: [''],
      organizer_id: localStorage.getItem('id'),
      category_id: [''],
      status: ['']
    });

    this.http.doGet('categories').subscribe((res) => {
      this.categoryList = res.categories
    })


  }

  get tickets(): FormArray {
    return this.ticketForm.get('tickets') as FormArray;
  }

  createTicket(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      total_quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  addTicket() {
    this.tickets.push(this.createTicket());
  }

  removeTicket(index: number) {
    this.tickets.removeAt(index);
  }

  submit() {
    if (this.ticketForm.valid) {
      this.http.doPost(`events/${this.eventID}/ticket-class`,this.ticketForm.value.tickets).subscribe((res) => {
        if (res.errorMessage) {
          this.notification.showErrorNotification('', res.errorMessage)
        } else {
          this.notification.showSucessNotification('', res.message);
          this.http.doGet(`events/${this.eventID}`).subscribe((res) => {
            this.userDetails = res.event;
            this.registered = res.event.registered
          })
        }
      })
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }



  ngOnInit(): void {
    this.getData();
    this.ticketForm = this.fb.group({
      tickets: this.fb.array([this.createTicket()])
    });
  }

  getData() {
    this.role = localStorage.getItem('role')
    if (this.role == 'Admin' || this.role == 'Participant') {
      this.http.doGet('events').subscribe((res) => {
        this.eventsList = res.events
      })
    } else if (this.role == 'Organizer') {
      this.http.doGet(`user/${localStorage.getItem('id')}/events`).subscribe((res) => {
        this.eventsList = res.events
      })
    }


  }


 

  closeSidebar() {
    this.isSidebarOpen = false;
    this.selectedUser = null;
    this.showAdd = false;
  }

  openSidebar(user: any, type: any) {
    this.eventID= user.id
    if (type == 'add') {
      this.showAdd = true
      this.isSidebarOpen = true;
      this.eventForm.reset();
    } else if (type == 'edit') {
      this.isSidebarOpen = true;
      this.selectedUser = { ...user };
      this.http.doGet(`events/${user.id}`).subscribe((res) => {
        this.userDetails = res.event;
        this.registered = res.event.registered
        console.log(this.registered)
        this.eventForm.patchValue({
          title:  this.userDetails?.title,
          description:  this.userDetails?.description,
          from_date:  this.userDetails?.from_date,
          to_date: this.userDetails?.to_date,
          languages: this.userDetails?.languages,
          location:  this.userDetails?.location,
          capacity: this.userDetails?.capacity,
          category_id:  this.userDetails?.category_id,
          status: this.userDetails?.status
        })
      })
    } else if (type == 'view') {
      this.http.doGet(`events/${user.id}`).subscribe((res) => {
        this.userDetails = res;
        this.registered = res.event.registered

      })

    }

  }

  selectTicket(ticketId: number) {
    this.selectedTicketId = ticketId;
  }

  register() {
    if (!this.selectedTicketId) {
      alert("Please select a ticket.");
      return;
    }
    const payload = {
      ticket_class_id: this.selectedTicketId
    };

    this.http.doPost(`events/${this.eventID}/register`, payload).subscribe((res) => {
      if (res.errorMessage) {
        this.notification.showErrorNotification('', res.errorMessage)
      } else {
        this.notification.showSucessNotification('', res.message);
      }

    })

  }

  updateData() {
    if (this.showAdd) {
      this.http.doPost('events', this.eventForm.value).subscribe((res) => {
        if (res.errorMessage) {
          this.notification.showErrorNotification('', res.errorMessage)
        } else {
          this.notification.showSucessNotification('', res.message);
          this.closeSidebar();
          this.getData();
        }
      })

    } else {
      this.http.doUpdate(`events/${this.userDetails.id}`, this.eventForm.value).subscribe((res) => {
        if (res.errorMessage) {
          this.notification.showErrorNotification('', res.errorMessage)
        } else {
          this.notification.showSucessNotification('', res.message);
          this.closeSidebar();
          this.getData();

        }
      })

    }

  }


}

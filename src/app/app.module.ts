import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './theme/login/login.component';
import { SignUpComponent } from './theme/sign-up/sign-up.component';
import { HeaderComponent } from './theme/layout/header/header.component';
import { MainLayoutComponent } from './theme/layout/main-layout/main-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './theme/components/users-list/users-list.component';
import { HttpInterceptorService } from './theme/core/interceptors/http.interceptor';
import { CategoryComponent } from './theme/components/category/category.component';
import { EventsComponent } from './theme/components/events/events.component';
import { MyEventsComponent } from './theme/components/my-events/my-events.component';
import { ProfileComponent } from './theme/components/profile/profile.component';
import { UserEventRegistrationsComponent } from './theme/components/user-event-registrations/user-event-registrations.component';
import { UserFeedbackComponent } from './theme/components/user-feedback/user-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    MainLayoutComponent,
    UsersListComponent,
    CategoryComponent,
    EventsComponent,
    MyEventsComponent,
    ProfileComponent,
    UserEventRegistrationsComponent,
    UserFeedbackComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    	preventDuplicates: true,
      maxOpened: 1
    }),
    BrowserAnimationsModule
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

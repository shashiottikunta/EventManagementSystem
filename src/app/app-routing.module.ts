import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './theme/login/login.component';
import { SignUpComponent } from './theme/sign-up/sign-up.component';
import { MainLayoutComponent } from './theme/layout/main-layout/main-layout.component';
import { UsersListComponent } from './theme/components/users-list/users-list.component';
import { CategoryComponent } from './theme/components/category/category.component';
import { EventsComponent } from './theme/components/events/events.component';
import { MyEventsComponent } from './theme/components/my-events/my-events.component';
import { ProfileComponent } from './theme/components/profile/profile.component';
import { UserEventRegistrationsComponent } from './theme/components/user-event-registrations/user-event-registrations.component';
import { UserFeedbackComponent } from './theme/components/user-feedback/user-feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignUpComponent
  },
  {
    path: 'layout',
    component: MainLayoutComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
    
      {
        path: 'users-list',
        component: UsersListComponent
      },
      
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'my-events',
        component: MyEventsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'event-registrations',
        component: UserEventRegistrationsComponent
      },
      {
        path: 'user-feedback',
        component: UserFeedbackComponent
      },
    


    
     
    ],
  }

 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

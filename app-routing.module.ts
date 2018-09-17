import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ContainerComponent} from './container/container.component';
import {UserComponent} from './user/user.component';
import {ActivitiesComponent} from './activities/activities.component';

const routes: Routes = [
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'container',
    component:ContainerComponent
  },
  {
    path: 'userProfile/:id',
    component:UserComponent
  },
  {
    path: 'activities',
    component:ActivitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

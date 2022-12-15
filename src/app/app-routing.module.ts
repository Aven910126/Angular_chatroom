import { LoginComponent } from './login/login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'chatroom', component: ChatroomComponent }, 
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

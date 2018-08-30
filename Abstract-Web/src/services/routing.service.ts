import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { ContactUsComponent } from '../app/pages/contact-us/contact-us.component';


//routing links to navigate through the web-app
const appRouets: Routes = [
  { path: '', redirectTo: '/works', pathMatch: 'full' },
  { path: 'works', component: HomeComponent },
  { path: 'contactUs', component: ContactUsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRouets)],
  exports: [RouterModule]
})

export class RoutingService {
}

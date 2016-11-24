import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { EncountersComponent } from './encounters/encounters.component';
import { ReportComponent } from './report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogComponent } from './blog/blog.component';

//Step 2: After components are created, make appRoutes here.
//Paste <router-outlet></router-outlet> in app.component.html.

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },//path: '' will make this page the homepage
  { path: 'register', component: RegisterComponent },
  { path: 'encounters', component: EncountersComponent },
  { path: 'report', component: ReportComponent },
  { path: 'blog', component: BlogComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    EncountersComponent,
    ReportComponent,
    NotFoundComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)//Add this line
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

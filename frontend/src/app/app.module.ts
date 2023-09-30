import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AdminAddNewUserComponent } from './admin-add-new-user/admin-add-new-user.component';
import { AdminAddNewArtefactComponent } from './admin-add-new-artefact/admin-add-new-artefact.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminArtefactComponent } from './admin-artefact/admin-artefact.component';
import { AdminAddPredefiniedValComponent } from './admin-add-predefinied-val/admin-add-predefinied-val.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    RegisterComponent,
    AdminAddNewUserComponent,
    AdminAddNewArtefactComponent,
    ResetPasswordComponent,
    AdminArtefactComponent,
    AdminAddPredefiniedValComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

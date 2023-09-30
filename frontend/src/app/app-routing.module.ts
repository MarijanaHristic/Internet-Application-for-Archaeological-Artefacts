import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AdminAddNewUserComponent } from './admin-add-new-user/admin-add-new-user.component';
import { AdminAddNewArtefactComponent } from './admin-add-new-artefact/admin-add-new-artefact.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminArtefactComponent } from './admin-artefact/admin-artefact.component';
import { AdminAddPredefiniedValComponent } from './admin-add-predefinied-val/admin-add-predefinied-val.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "user", component: UserComponent},
  {path: "registration", component: RegisterComponent},
  {path: "addNewUser", component: AdminAddNewUserComponent},
  {path: "addNewArtefact", component: AdminAddNewArtefactComponent},
  {path: 'resetPassword/:token', component: ResetPasswordComponent},
  {path: 'adminArtefacts', component: AdminArtefactComponent},
  {path: 'adminAddPredefiniedVal', component: AdminAddPredefiniedValComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

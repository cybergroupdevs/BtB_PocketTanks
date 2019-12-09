import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/Components/footer/footer.module';
import { NavbarModule} from './shared/Components/navbar/navbar.module';
import { FixedPluginModule} from './shared/Components/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FixedPluginComponent } from './shared/Components/fixedplugin/fixedplugin.component';
import { LoginComponent } from './user/register-login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { NewpostDialogComponent } from './newpost-dialog/newpost-dialog.component';
import { TwitterAuthComponent } from './auth/twitter-auth/twitter-auth.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailVerificationComponent } from './auth/email-verification/email-verification.component';
import { ResetPasswordVerificationComponent } from './user/reset-password-verification/reset-password-verification.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ProfileDialogComponent } from './user/profile-dialog/profile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    NewpostDialogComponent,
    TwitterAuthComponent,
    EmailVerificationComponent,
    ResetPasswordVerificationComponent,
    ChangePasswordComponent,
    ProfileDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    FixedPluginComponent,
    NewpostDialogComponent,
    ProfileDialogComponent
  ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../user/user-profile/user.component';
import { WordCloudComponent } from '../../charts/word-cloud/word-cloud.component';

import { NgbModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SentimentLinechartComponent } from 'app/charts/sentiment-linechart/sentiment-linechart.component';
import { TweetCardComponent } from 'app/user/tweet-card/tweet-card.component';
import {
  MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
  MatCheckboxModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, 
  MatSelectModule, MatTabsModule, MatCardModule, MatSlideToggleModule, MatTooltipModule, MatRadioModule, MatSnackBarModule
} from '@angular/material';
import { NewpostComponent } from 'app/pages/newpost/newpost.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SocialAccountLoginComponent } from 'app/pages/social-account-login/social-account-login.component';
import { PieChartComponent } from 'app/charts/pie-chart/pie-chart.component';
import { DragAndDropDirective } from 'app/shared/Directives/drag-and-drop.directive';
import { HistogramComponent } from 'app/charts/histogram/histogram.component';
import { KpiComponent } from 'app/user/kpi/kpi.component';
import { CalendarComponent } from 'app/pages/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TweetDialogComponent } from 'app/user/tweet-dialog/tweet-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
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
    MatSlideToggleModule,
    MatCardModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatRadioModule,
    MatTooltipModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatSnackBarModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    WordCloudComponent,
    NewpostComponent,
    SocialAccountLoginComponent,
    SentimentLinechartComponent,
    TweetCardComponent,
    PieChartComponent,
    DragAndDropDirective,
    HistogramComponent,
    KpiComponent,
    CalendarComponent,
    TweetDialogComponent
  ],
  entryComponents: [
    SocialAccountLoginComponent,
    TweetDialogComponent
  ]
})

export class AdminLayoutModule { }

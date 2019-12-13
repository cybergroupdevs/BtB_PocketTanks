import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { MatDialog } from '@angular/material';
import { TweetDialogComponent } from 'app/user/tweet-dialog/tweet-dialog.component';
import { element } from 'protractor';
import { UserService } from 'app/shared/Services/user/user.service';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit{

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  events;
  profile_img = localStorage.getItem("profileImage");
  screenName = localStorage.getItem("screenName");
  name = localStorage.getItem("name");
  activeDayIsOpen: boolean = true;

  constructor(
    public _dialog: MatDialog,
    private _service: UserService
  ) {}

  ngOnInit(){
    // data from the api
    this._service.getScheduledTweets().subscribe(
      response=>{
      },
      err=>{
      }
    )


    this.events = [
      {
        _id: 1,
        start: new Date('Tue Dec 14 2019 17:20:09'),
        end: new Date('Tue Dec 14 2019 17:20:09'),
        // title: 'taran',
        // color: colors.blue,
        // actions: this.actions,
        profile_image: this.profile_img,
        screen_name: this.screenName,
        username: this.name,
        image: "https://inteng-storage.s3.amazonaws.com/img/iea/Ne6NqXMqG5/sizes/tesla-atv_resize_md.png",
        text: "Oops.....",
        scheduled_at: "14 DEC 2019"
      },
      {
        _id: 2,
        start: new Date(),
        end: new Date(),
        // title: 'An event with no end date',
        // color: colors.blue,
        // actions: this.actions,
        profile_image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        screen_name: "@Shibu_the_dog",
        username: "Shibu",
        image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        text: "Hiii, guys. All the best.",
        scheduled_at: "12 DEC 2019"
      },
      {
        _id: 3,
        start: new Date('Tue Dec 11 2019 17:20:09'),
        end:  new Date('Tue Dec 11 2019 17:20:09'),
        // title: 'Taran 2',
        // color: colors.blue,
        // actions: this.actions,
        profile_image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        screen_name: "@Shibu_the_dog",
        username: "Shibu",
        image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        text: "Hiii, guys. All the best.",
        scheduled_at: "12 DEC 2019"
      },
      {
        _id: 4,
        start: new Date('Tue Nov 10 2019 17:20:09'),
        end: new Date('Tue Nov 10 2019 17:20:09'),
        // title: 'Taran 2',
        // color: colors.blue,
        // actions: this.actions,
        profile_image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        screen_name: "@Shibu_the_dog",
        username: "Shibu",
        image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        text: "Hiii, guys. All the best.",
        scheduled_at: "12 DEC 2019"
      }
    ];

    this.events.forEach(element=>{
      
      // element["start"] = element["scheduled_at"]
      // element["end"] = element["scheduled_at"]

      // element["start"] = new Date('Tue Dec 9 2019 17:20:09')
      // element["end"] = new Date('Tue Dec 9 2019 17:20:09')
      element["title"] = String(element["text"]).substring(0,10)+"..."
      element["color"] = colors.blue
      element["actions"] = this.actions
    })
  }

  // reqd for openeing and closing of the black bar below the days
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

  }


  // is triggered when the event is clicked
  handleEvent(action: string, event: CalendarEvent): void {
    
    const dialogRef = this._dialog.open(TweetDialogComponent, {
      width: '400px',
      data: event // event is the json Object of the selected post
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     }
  //   ];
  // }

  
  // eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
  //   debugger;
  //   this.events = this.events.map(iEvent => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }


}

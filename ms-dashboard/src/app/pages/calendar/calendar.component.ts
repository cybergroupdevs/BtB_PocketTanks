import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { MatDialog } from '@angular/material';
import { ProfileDialogComponent } from 'app/user/profile-dialog/profile-dialog.component';
import { TweetDialogComponent } from 'app/user/tweet-dialog/tweet-dialog.component';


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


export class CalendarComponent{

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

  events: CalendarEvent[] = [
    {
      start: new Date('Tue Dec 9 2019 17:20:09'),
      end: new Date('Tue Dec 9 2019 17:20:09'),
      title: 'taran',
      color: colors.blue,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    },
    {
      start: new Date(),
      end: new Date(),
      title: 'An event with no end date',
      color: colors.blue,
      actions: this.actions
    },
    {
      start: new Date('Tue Dec 11 2019 17:20:09'),
      end:  new Date('Tue Dec 11 2019 17:20:09'),
      title: 'Taran 2',
      color: colors.blue,
      actions: this.actions
    },
    {
      start: new Date('Tue Nov 10 2019 17:20:09'),
      end:  new Date('Tue Nov 10 2019 17:20:09'),
      title: 'Taran 2',
      color: colors.blue,
      actions: this.actions
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal, 
    public _dialog: MatDialog
  ) {}

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

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    debugger;
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  // is triggered when the event is clicked
  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
    
    const dialogRef = this._dialog.open(TweetDialogComponent, {
      width: '400px',
      data: {} 
    });
    dialogRef.afterClosed().subscribe(result => {
    });

    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
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

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

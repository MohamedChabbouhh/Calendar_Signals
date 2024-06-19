import {Component, computed, input, Signal, signal} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import {NgClass} from "@angular/common";
import {MeetingsInterface} from "../../models/meetings.interface";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  meetings = input.required<MeetingsInterface>();
  activeDay=signal<DateTime|null>(null);
  today :Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth =signal<DateTime>(this.today().startOf('month'));
  weekDays:Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth:Signal<DateTime[]> = computed(()=>{
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
    )
      .splitBy({day : 1})
      .map((d)=>{
        if(d.start === null){
          throw  new Error('Wrong dates');
        }
        return d.start
      })
    });
  DATE_MED= DateTime.DATE_MED;
  activeDayMeetings :Signal<string[]> = computed(()=>{
    const activeDay = this.activeDay();
    if(activeDay === null){
      return []
    }
    const activeDayISO = activeDay.toISODate();
    if(!activeDayISO){
      return [];
    }
    return this.meetings()[activeDayISO] ?? [];
  });
  goToPreviousMonth():void{
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({month:1}),
    );
  }

  goToNextMonth():void{
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({month:1}),
    );
  }
  goToToday():void{
   this.firstDayOfActiveMonth.set(this.today().startOf('month'))
  }





 /*  constructor() {
     console.log(this.today().startOf('month').toString());
     console.log(Info.weekdays());
     console.log(this.daysOfMonth())
   }*/
}

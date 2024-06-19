import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarComponent} from "./components/calendar/calendar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calendar_signals';
  meetings ={
    '2024-06-09':['shower','Coffee','Work'],
    '2024-06-11':['shower','Coffee','xxxx'],
    '2024-06-15':['shower','Coffee','yyyyy'],
    '2024-06-22':['shower','Coffee','zzzzz'],
  }
}

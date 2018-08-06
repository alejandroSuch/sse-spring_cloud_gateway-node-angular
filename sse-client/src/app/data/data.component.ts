import {Component, OnInit} from '@angular/core';
import {SseService} from "../sse.service";
import {Subscription} from 'rxjs';
import { Input } from '@angular/core';

@Component({
  selector: 'sse-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  @Input()
  index: number;

  private subscription: Subscription;
  subscribed: boolean = false;
  data: any = null;

  constructor(private sse: SseService) {
  }

  ngOnInit() {
    this.subscribe();
  }

  subscribe() {
    this.subscribed = true;
    this.subscription = this.sse.observable.subscribe(
      data => this.data = data,
      err => console.error('Got error', err),
      () => console.info(this, 'complete')
    );
  }

  unsubscribe() {
    this.subscribed = false;
    this.subscription.unsubscribe();
  }

}

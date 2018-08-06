import {Injectable, NgZone} from '@angular/core';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  observable: Observable<any>;
  observers = [];
  eventSource = null;

  constructor(zone: NgZone) {
    console.info('creating observable');
    this.observable = Observable.create(observer => {
      this.push(observer);
      this.createEventSource();
      this.onMessage(zone);
      this.onError(zone);

      return this.onUnsubscribe(observer, zone);
    });
  }

  private onUnsubscribe(observer, zone: NgZone) {
    return () => {
      this.remove(observer);
      if (this.observers.length === 0) {
        this.closeEventSource(zone);
      }
    };
  }

  private closeEventSource(zone: NgZone) {
    console.info('Closing event source');
    zone.run(() => {
      this.eventSource.close();
      this.eventSource = null;
    });
  }

  private remove(observer) {
    this.observers = this.observers.filter(it => it !== observer);
  }

  private onError(zone: NgZone) {
    this.eventSource.onerror = (x) => {
      console.error('Got error', x);
      zone.run(() => this.observers.forEach(it => it.error(x)));
    };
  }

  private onMessage(zone: NgZone) {
    this.eventSource.onmessage = ({data}) => {
      console.log('got data', data);
      zone.run(() => this.observers.forEach(it => it.next(JSON.parse(data).data)));
    };
  }

  private createEventSource() {
    if (!this.eventSource) {
      console.log('Creating event source');
      this.eventSource = new EventSource('http://localhost:8080/sse');
    } else {
      console.log('Event source already created');
    }
  }

  private push(observer) {
    this.observers = [...this.observers, observer];
  }
}

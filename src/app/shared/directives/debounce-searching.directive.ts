import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceSearching]',
})
export class DebounceSearchingDirective {
  @Output('appDebounceSearching') search = new EventEmitter<string>();

  private subject = new Subject<string>();

  ngOnInit() {
    this.subject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((v: string) => this.search.emit(v));
  }

  @HostListener('keyup', ['$event.target.value']) onKeyUp(value: string) {
    this.subject.next(value);
  }
}

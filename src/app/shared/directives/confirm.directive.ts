import {Output, HostListener, EventEmitter, Directive} from '@angular/core';

@Directive({
  selector: '[confirm]'
})
export class ConfirmDirective {
  @Output('confirm-click') click: any = new EventEmitter();

  @HostListener('click', ['$event']) clicked(e) {
    this.click.emit();
  }
}

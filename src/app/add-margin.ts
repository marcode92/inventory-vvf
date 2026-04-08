import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[margin]',
})
export class AddMargin {
  constructor(private el:ElementRef) {}

  @Input() margin: number = 0

  ngOnChanges() {
    this.el.nativeElement.style.margin = this.margin + 'px';
  }
}

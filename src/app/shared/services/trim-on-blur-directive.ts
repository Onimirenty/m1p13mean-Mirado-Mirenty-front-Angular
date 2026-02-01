import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[trimOnBlur]'
})
export class TrimOnBlurDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('blur')
  onBlur() {
    const value = this.ngControl.control?.value;
    if (typeof value === 'string') {
      this.ngControl.control?.setValue(value.trim(), { emitEvent: false });
    }
  }
}

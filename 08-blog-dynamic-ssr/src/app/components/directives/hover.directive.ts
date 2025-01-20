import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

@Input() hoverClass: string = '';
@Input() hoverTargetSelector: string = '';


private element = inject(ElementRef)
private renderer = inject(Renderer2);

@HostListener('mouseenter') onMouseEnter(){
  const target = this.element.nativeElement.querySelector(this.hoverTargetSelector);
  if(target){
    this.renderer.addClass(target, this.hoverClass);
  }


}
@HostListener('mouseleave') onMouseLeave(){
  const target = this.element.nativeElement.querySelector(this.hoverTargetSelector);
  if(target){
    this.renderer.removeClass(target, this.hoverClass);
  }
}
}

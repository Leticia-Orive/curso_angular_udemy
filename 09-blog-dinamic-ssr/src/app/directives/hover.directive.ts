import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {

  @Input() hoverClass: string = ''; // Clase a añadir
  @Input() hoverTargetSelector: string = ''; // Selector objetivo donde colocar la clase

  private element = inject(ElementRef)
  private renderer = inject(Renderer2)

  @HostListener('mouseenter') onMouseEnter(){
    // Buscamos el objetivo dentro del elemento
    const target = this.element.nativeElement.querySelector(this.hoverTargetSelector);
    if(target){
      // añade la clase
      this.renderer.addClass(target, this.hoverClass);
    }
  }
 
  @HostListener('mouseleave') onMouseLeave(){
     // Buscamos el objetivo dentro del elemento
    const target = this.element.nativeElement.querySelector(this.hoverTargetSelector);
    if(target){
      // quita la clase
      this.renderer.removeClass(target, this.hoverClass);
    }
  }

}

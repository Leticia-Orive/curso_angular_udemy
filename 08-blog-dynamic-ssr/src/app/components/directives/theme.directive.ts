import { Directive, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { Theme } from '../../types';

@Directive({
  selector: '[appTheme]',
  standalone: true,
})
export class ThemeDirective {

  @Input({required: true}) theme: Theme = 'light';
  @Output() themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  private renderer = inject(Renderer2);

  @HostListener('click') onClick(){
    this.switchTheme(this.theme);
  }
  private switchTheme(theme: Theme){
    const body = document.body;
    this.renderer.setAttribute(body, 'data-theme', theme);
    this.themeSelected.emit(theme);
  }

}

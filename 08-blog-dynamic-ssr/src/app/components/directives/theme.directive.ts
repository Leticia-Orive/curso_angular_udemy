import { Directive, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true,
})
export class ThemeDirective {

  @Input({required: true}) theme: string = 'light';
  @Output() themeSelected: EventEmitter<string> = new EventEmitter<string>();

  private renderer = inject(Renderer2);

  @HostListener('click') onClick(){
    this.switchTheme(this.theme);
  }
  private switchTheme(theme: string){
    const body = document.body;
    this.renderer.setAttribute(body, 'data-theme', theme);
    this.themeSelected.emit(theme);
  }

}

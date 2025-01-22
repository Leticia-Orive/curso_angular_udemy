import { Directive, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { Theme } from '../types';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective {

  @Input({required: true}) theme: Theme = 'light'
  @Output() themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  private renderer = inject(Renderer2)

  // Con @HostListener('click') los elementos que tengan la directiva tendran esta funcionalidad al hacer click
  @HostListener('click') onClick(){
    this.switchTheme(this.theme);
  }

  private switchTheme(theme: Theme){
    // Obtenemos el body
    const body = document.body;
    // Añade el atributo data-bs-theme con el valor del theme al body
    this.renderer.setAttribute(body, 'data-bs-theme', theme)
    // Emitimos el nuevo theme
    this.themeSelected.emit(theme);
  }

}

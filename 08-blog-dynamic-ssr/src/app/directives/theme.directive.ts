import { Directive, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective {

  @Input({required: true}) theme: string = 'light'
  @Output() themeSelected: EventEmitter<string> = new EventEmitter<string>();

  private renderer = inject(Renderer2)

  // Con @HostListener('click') los elementos que tengan la directiva tendran esta funcionalidad al hacer click
  @HostListener('click') onClick(){
    this.switchTheme(this.theme);
  }

  private switchTheme(theme: string){
    // Obtenemos el body
    const body = document.body;
    // Añade el atributo data-bs-theme con el valor del theme al body
    this.renderer.setAttribute(body, 'data-bs-theme', theme)
    // Emitimos el nuevo theme
    this.themeSelected.emit(theme);
  }

}

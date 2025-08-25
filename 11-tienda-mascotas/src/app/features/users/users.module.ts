// Módulo de usuarios. Importa dependencias comunes, aunque el componente es standalone.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// UserListComponent es standalone, no se declara ni exporta en un NgModule
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: []
})
export class UsersModule {}

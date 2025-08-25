// Punto de entrada principal de la aplicación Angular. Inicializa la app con la configuración y el componente raíz.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

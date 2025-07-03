import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { EmpleadoComponent } from './app/components/empleado/empleado.component';

bootstrapApplication(EmpleadoComponent, appConfig)
  .catch((err) => console.error(err));




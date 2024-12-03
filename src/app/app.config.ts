import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MyHammerConfig } from './hammer.config';
import 'hammerjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    provideAnimations(),
    provideToastr({
      // Provide Toastr with default configuration
      timeOut: 500,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
};

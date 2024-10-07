import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/services/auth-guard';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      RouterModule.forRoot(routes)
    ),
    AuthGuard,
  ],
}).catch(err => console.error(err));

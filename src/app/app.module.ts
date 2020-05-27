import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';


// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: 'http://localhost:3500',
  options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

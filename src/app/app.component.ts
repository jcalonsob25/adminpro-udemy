import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';
import { WebsocketserviceService } from './services/websocketservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public _ajustes: SettingsService, public wsService: WebsocketserviceService ) {}
}

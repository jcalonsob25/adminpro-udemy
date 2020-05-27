import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketserviceService {

  constructor(private socket: Socket, private router: Router) { 
    this.checkStatus();
    this.listen('hola-mundo');
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor de SOCKETS');
    })
  }

  emit(evento: string, payload?: any, callback?: any){
    // emit ('EVENTO', payload, callback)
    this.socket.emit(evento, payload, callback);

  }
  listen( evento: string){
    return this.socket.fromEvent( evento );
  }
}

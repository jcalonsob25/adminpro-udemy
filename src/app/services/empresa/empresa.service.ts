import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS_CGO } from '../../config/config';
import { WebsocketserviceService } from '../websocketservice.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  constructor(public http: HttpClient, public wsService: WebsocketserviceService) { }

  cargarEmpresas(pagina: number, search: string){
    console.log('Consultando servicio...');
    const url = URL_SERVICIOS_CGO + '/Empresas/get/' + pagina;
    const objeto = {
      institutoId: 0,
      search
    }
    return this.http.post(url, objeto);
  }


  buscarEmpresas(pagina: number, search: string){
    const url = URL_SERVICIOS_CGO + '/Empresas/get/' + pagina;
    const data = {
      institutoId: 0,
      search
    };
    console.log(data);
    return this.http.post(url, data);
  }

  borrarEmpresa(empresaId: string){
    const url = URL_SERVICIOS_CGO + '/Empresa/delete/' + empresaId;
    const data = {};
    return this.http.post(url, data);
  }

  getMessage(){
    return this.wsService.listen('hola-mundo');
  }
}

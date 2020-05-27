import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS_CGO } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(public http: HttpClient) { }

  cargarLogs(pagina: number, search: string){
    const url = URL_SERVICIOS_CGO + '/getLogs/' + pagina;
    const data = {
      search
    };
    return this.http.post(url, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS_CGO } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public http: HttpClient) { }

  cargarProductos(empresaId){
    const url = URL_SERVICIOS_CGO + '/Productos/' + empresaId;
    return this.http.get(url);
  }

  getEstatusPasos(empresaId: string, fechaCertificar: number, tipo: string, productoId: string){
    console.log(tipo);
    let url: any;
    const urlCertificar = URL_SERVICIOS_CGO + '/Certificar/estatusGET/' + empresaId;
    const urlMedir = URL_SERVICIOS_CGO + '/Medir/estatusGET/' + empresaId;
    let data = {};
    switch (tipo){
      case '1':
        data = {
          fechaCertificar
        };
        url = urlCertificar;
        break;
      case '2':
        data = {
          productoId
        };
        url = urlMedir;
        break;
    }
    return this.http.post(url, data);
  }

  actualizarEstatusPaso(empresaId: string, data: any){
    console.log(data);
    const url = URL_SERVICIOS_CGO + '/Certificar/estatus/' + empresaId;
    return this.http.post(url, data);
  }

  reiniciarProceso(empresaId: string, data: any){
    const url = URL_SERVICIOS_CGO + '/Certificar/reiniciar/' + empresaId;
    return this.http.post(url, data);
  } // comentario
}

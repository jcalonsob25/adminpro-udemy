import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS, URL_SERVICIOS_CGO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    let url2 = URL_SERVICIOS_CGO + '/logo2/get/';

    if ( !img){
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0){
      return img;
    }
    switch (tipo){
      case 'usuario':
         url += '/usuarios/' + img;
         break;
        case 'medico':
          url += '/medicos/' + img;
          break;
        case 'hospital':
          url += '/hospitales/' + img;
          break;
        case 'empresa':
          url = url2 + '' + img;
          break;
        default:
          console.log('Tipo de imagen no exise, usuarios, medicos, hospitales');
          url += '/usuarios/xxx';
          break;
    }
    return url;
  }

}

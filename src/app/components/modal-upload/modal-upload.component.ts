import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ],
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  constructor( public _cargaArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) {
    console.log('Modal listo');
   }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    console.log(archivo);
    if(archivo.type.indexOf('image') < 0){
      swal('Sólo imágenes', 'El archivo debe ser una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen(){
    this._cargaArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then(resp => {
      console.log(resp);
      this._modalUploadService.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch(err =>{
      console.log('Error en la carga...');
    });
  }

}

import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
   }
  estaLogueado(){
    console.log(this.token.length);
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }
   guardarStorage( id: string, token: string, usuario: Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
   }

   loginGoogle(token: string){
     const url = URL_SERVICIOS + '/login/google';
     return this.http.post(url, {token})
     .pipe(
       map((resp: any) => {
         this.guardarStorage(resp.id, resp.token, resp.usuario);
         return true;
       })
     );
   }

   logout(){
     this.usuario = null;
     this.token = '';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     this.router.navigate(['/login']);
   }

   login(usuario: Usuario, recordar: boolean = false){
     if (recordar){
       localStorage.setItem('email', usuario.email);
     }else{
       localStorage.removeItem('email');
     }
     const url = URL_SERVICIOS + '/login';
     return this.http.post(url, usuario)
     .pipe(
       map((resp: any) => {
         /* localStorage.setItem('id', resp.id);
         localStorage.setItem('token', resp.token);
         localStorage.setItem('usuario', JSON.stringify(resp.usuario)); */
         this.guardarStorage(resp.id, resp.token, resp.usuario);
         return true;
       })
     );
   }

   crearUsuario(usuario: Usuario){
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
    .pipe(
      map( (resp: any) => {
        swal('Usuario creado ', usuario.email, 'success');
        return resp.usuario;
      })
    );
   }

   actualizarUsuario( usuario: Usuario){
     let url = URL_SERVICIOS + '/usuario/' + usuario._id;
     url += '?token=' + this.token;
     console.log(url);
     console.log(usuario);
     return this.http.put(url, usuario)
     .pipe(
       map( (resp: any) => {
         if(usuario._id === this.usuario._id){
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
         }
         swal('Usuario actualizado', usuario.nombre, 'success');
         return true;
       })
     );
   }

   cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
    .then((resp: any) => {
      // console.log(this.usuario);
      console.log(resp);
      this.usuario.img = resp.usuarioActualizado.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario);
    })
    .catch(resp => {
      console.log(resp);
    });
   }

   cargarUsuarios(desde: number = 0){
     console.log('Consultando servicio...');
     const url = URL_SERVICIOS + '/usuario?desde= ' + desde;
     return this.http.get(url);
   }

   buscarUsuarios(termino: string){
     let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
     return this.http.get( url )
     .pipe(
       map( (resp: any) => resp.usuarios)
     );
   }

   borrarUsuario( id: string){
     let url = URL_SERVICIOS + '/usuario/' + id;
     url += '?token=' + this.token;
     console.log(url);
     return this.http.delete( url )
     .pipe(
       map(resp =>{
         swal('Usuario borrado', 'El usuario ha sido eliminado correctamente');
         return true;
       })
     );
   }
}

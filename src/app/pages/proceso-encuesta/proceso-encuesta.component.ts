import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceso-encuesta',
  templateUrl: './proceso-encuesta.component.html',
  styleUrls: ['./proceso-encuesta.component.css']
})
export class ProcesoEncuestaComponent implements OnInit {
  empresa: string;
  empresaId: string;
  productoId: string;
  fecha: number;
  tipo: string;
  idiomas: boolean = false;
  nps: boolean = false;
  reactivos: boolean = false;
  abiertas: boolean = false;
  demograficos: boolean = false;
  practicas: boolean = false;
  adicionales: boolean = false;
  colaboradores: boolean = false;
  programacion: boolean = false;
  envio: boolean = false;
  cierre: boolean = false;
  cargando: boolean = true;
  constructor(private rutaActiva: ActivatedRoute, public _productoService: ProductoService) { }

  ngOnInit(): void {
    this.empresa = this.rutaActiva.snapshot.params.empresa;
    this.empresaId = this.rutaActiva.snapshot.params.empresaId;
    this.productoId = this.rutaActiva.snapshot.params.idprod;
    this.fecha = this.rutaActiva.snapshot.params.fecha;
    this.tipo = this.rutaActiva.snapshot.params.tipo;
    this.getEstatusPasos();
  }

  getEstatusPasos(){
    console.log('Consultando estatus de pasos');
    this.cargando = true;
    console.log(this.fecha);
    console.log(this.tipo);
    this._productoService.getEstatusPasos(this.empresaId, this.fecha, this.tipo, this.productoId)
    .subscribe( (resp: any) => {
      console.log(resp);
      if(resp.estatusSecciones.idiomas === 2){
        this.idiomas = true;
      }else{
        this.idiomas = false;
      }
      if(resp.estatusSecciones.nps === 2){
        this.nps = true;
      }else{
        this.nps = false;
      }
      if(resp.estatusSecciones.reactivos === 2){
        this.reactivos = true;
      }else{
        this.reactivos = false;
      }
      if(resp.estatusSecciones.abiertas === 2){
        this.abiertas = true;
      }else{
        this.abiertas = false;
      }
      if(resp.estatusSecciones.demograficos === 2){
        this.demograficos = true;
      }else{
        this.demograficos = false;
      }
      if(resp.estatusSecciones.forall === 2){
        this.practicas = true;
      }else{
        this.practicas = false;
      }  
      if(resp.estatusSecciones.adicionales === 2){
        this.adicionales = true;
      }else{
        this.adicionales = false;
      }
      if(resp.estatusSecciones.colaboradores === 2){
        this.colaboradores = true;
      }else{
        this.colaboradores = false;
      }

      if(resp.estatusSecciones.programacion === 2){
        this.programacion = true;
      }else{
        this.programacion = false;
      }
      if (resp.estatusSecciones.envio === 2){
        this.envio = true;
      }else{
        this.envio = false;
      }
      if(resp.estatusSecciones.close === 2){
        this.cierre = true;
      }else{
        this.cierre = false;
      }
      this.cargando = false;
    });
  }

  actualizar(e: any, paso: number){
    console.log(paso);
    console.log(e.target.checked);
    let numero;
    let nombrePaso;
    let accion;
    let bandera;
    if (e.target.checked){
      numero = 2;
      accion = 'Desbloquear';
      bandera = false;
      e.target.checked = false;
    }else{
      numero = 1;
      accion = 'Bloquear';
      bandera = true;
      e.target.checked = true;
    }
    const data: any = {
      fechaCertificar: this.fecha
    };
    switch (paso){
      case 1:
        // IDIOMAS
        data.idiomas = numero;
        nombrePaso = 'Idiomas';
        break;
      case 2:
          // NPS
        data.nps = numero;
        nombrePaso = 'NPS';
        break;
      case 3:
          // Reactivos
        data.reactivos = numero;
        nombrePaso = 'Reactivos';
        break;
      case 4:
          // Abiertas
        data.abiertas = numero;
        nombrePaso = 'Abiertas';
        break;
      case 5:
          // Demográficos
        data.demograficos = numero;
        nombrePaso = 'Demográficos';
        break;
      case 6:
          // Prácticas 4all
        data.forall = numero;
        nombrePaso = 'Prácticas 4all';
        break;
      case 7:
          // Adicionales
        data.adicionales = numero;
        nombrePaso = 'Adicionales';
        break;
      case 8:
          // Colaboradores
        data.colaboradores = numero;
        nombrePaso = 'Colaboradores';
        break;
      case 9:
          // Programación
        data.programacion = numero;
        nombrePaso = 'Programación de Encuesta';
        break;
      case 10:
          // Envío
        data.envio = numero;
        nombrePaso = 'Envío de Correos';
        break;
      case 11:
          // Cierre
        data.close = numero;
        nombrePaso = 'Cierre de Encuesta';
        break;
      default:
        console.log('Paso no válido');
        break;
    }
    if( paso === 1 && numero === 2){
      Swal.fire({
        title: '¿Está seguro?',
        text: `¿${accion} el paso de ${nombrePaso}?\nSe reiniciará TODO el proceso`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Sí, ${accion}`,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this._productoService.reiniciarProceso(this.empresaId, data)
          .subscribe((resp: any) => {
            if(resp.success === true){
              e.target.checked = !bandera;
              this.getEstatusPasos();
              Swal.fire(
                '!Éxito!',
                'Se actualizó correctamente',
                'success'
              );
            }else{
              e.target.checked = !bandera;
              Swal.fire(
                '!ERROR!',
                'Ocurrió un error',
                'error'
              );
            }
          });
        }
      });
    }else{
      Swal.fire({
      title: '¿Está seguro?',
      text: `¿${accion} el paso de ${nombrePaso}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._productoService.actualizarEstatusPaso(this.empresaId, data)
        .subscribe((resp: any) => {
          e.target.checked = !bandera;
          Swal.fire(
            '!Éxito!',
            'Se actualizó correctamente',
            'success'
          );
        });
      }
    });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/service.index';
import swal from 'sweetalert';
import { WebsocketserviceService } from '../../services/websocketservice.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
  ],
})
export class EmpresasComponent implements OnInit {
  pagina: number = 0;
  search: string = '';
  empresas: [] = [];
  totalRegistros: number;
  siguiente: boolean = false;
  anterior: boolean = false;
  cargando: boolean = true;
  mensajeSubscription: Subscription;
  constructor(public _empresaService: EmpresaService, public wsService: WebsocketserviceService) { }

  ngOnInit(): void {
    this.cargarEmpresas();
    this.mensajeSubscription = this._empresaService.getMessage().subscribe( msg =>{
      console.log(msg);
    });
  }

  cargarEmpresas(){
    this.cargando = true;
    this._empresaService.cargarEmpresas(this.pagina, this.search)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.empresas = resp.data.docs;
      this.totalRegistros = resp.data.totalDocs;
      this.anterior = resp.data.hasPrevPage;
      this.siguiente = resp.data.hasNextPage;
      this.cargando = false;
      console.log(this.anterior);
      console.log(this.siguiente);
    });
  }

  cambiarPagina(pagina: number){
    this.pagina += pagina;
    this.cargarEmpresas();
  }

  buscarEmpresa(search: string){
    this.cargando = true;
    console.log(search);
    this._empresaService.buscarEmpresas(this.pagina, search)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.empresas = resp.data.docs;
      this.totalRegistros = resp.data.totalDocs;
      this.anterior = resp.data.hasPrevPage;
      this.siguiente = resp.data.hasNextPage;
      this.cargando = false;
      this.search = search;
    });
  }

  verProductos(empresaId: any){
    console.log(empresaId);
  }

  borrarEmpresa(nombreEmpresa: string, empresaId: string){
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar la empresa ' + nombreEmpresa,
      icon: 'warning',
      dangerMode: true,
    })
    .then( borrar => {
      console.log(borrar);
      if (borrar) {
        this._empresaService.borrarEmpresa( empresaId )
        .subscribe( borrado => {
          console.log(borrado);
          this.cargarEmpresas();
        });
      }
    });
  }

}

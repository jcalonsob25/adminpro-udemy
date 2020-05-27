import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(public logService: LogService) { }
  cargando = true;
  logs: [] = [];
  pagina: number = 1;
  search: string = '';
  totalRegistros: number;
  siguiente: boolean;
  anterior: boolean;
  nextPage: number;
  prevPage: number;

  ngOnInit(): void {
    this.cargarLogs();
  }

  cargarLogs(){
    this.cargando = true;
    this.logService.cargarLogs(this.pagina, this.search)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.logs = resp.resultado.docs;
      this.totalRegistros = resp.resultado.totalDocs;
      this.anterior = resp.resultado.hasPrevPage;
      this.siguiente = resp.resultado.hasNextPage;
      this.nextPage = resp.resultado.nextPage;
      this.prevPage = resp.resultado.prevPage;
      this.cargando = false;
    });
  }

  actualizarLogs(){
    this.cargando = true;
    this.pagina = 1;
    this.logService.cargarLogs(this.pagina, this.search)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.logs = resp.resultado.docs;
      this.totalRegistros = resp.resultado.totalDocs;
      this.anterior = resp.resultado.hasPrevPage;
      this.siguiente = resp.resultado.hasNextPage;
      this.nextPage = resp.resultado.nextPage;
      this.prevPage = resp.resultado.prevPage;
      this.cargando = false;
    });
  }

  buscar(search: string){
    this.cargando = true;
    this.pagina = 1;
    this.search = search;
    this.logService.cargarLogs(this.pagina, search)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.logs = resp.resultado.docs;
      this.totalRegistros = resp.resultado.totalDocs;
      this.anterior = resp.resultado.hasPrevPage;
      this.siguiente = resp.resultado.hasNextPage;
      this.nextPage = resp.resultado.nextPage;
      this.prevPage = resp.resultado.prevPage;
      this.cargando = false;
    });
  }

  cambiarPagina(pagina: number){
    this.pagina  = pagina;
    this.cargarLogs();
  }
}

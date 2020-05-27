import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params} from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  empresa: string;
  empresaId: string;
  instituto: number;
  productos: [];
  cargando: boolean = true;
  constructor(private rutaActiva: ActivatedRoute, public productoService: ProductoService) { }

  ngOnInit(): void {
    this.empresa = this.rutaActiva.snapshot.params.empresa;
    this.empresaId = this.rutaActiva.snapshot.params.empresaId;
    this.instituto = this.rutaActiva.snapshot.params.instituto;
    console.log(this.empresa);
    console.log(this.empresaId);
    this.cargarProductos();
  }

  cargarProductos(){
    this.cargando = true;
    this.productoService.cargarProductos(this.empresaId)
    .subscribe((resp: any ) => {
      this.productos = resp.productosCertificar;
      console.log(this.productos);
      this.cargando = false;
    });
  }

}

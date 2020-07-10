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
  productosCertificar: [];
  productosMedir: [];
  productosNorma: [];
  productosPulseCheck: [];
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
      console.log(resp);
      this.productos = resp.productosCertificar;
      this.productosCertificar = resp.productosCertificar;
      this.productosMedir = resp.productosMedir;
      this.productosNorma = resp.productosNorma35;
      this.productosPulseCheck = resp.productosPulseCheck;
      console.log(this.productos);
      this.cargando = false;
    });
  }

}

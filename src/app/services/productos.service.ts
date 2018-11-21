import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  cargando = true;

  constructor( private http: HttpClient ) {

    this.cargarProductos();

   }

   private cargarProductos() {
    this.http.get('https://angular-html-8ce9f.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
      this.productos = resp;
      this.cargando = false;
      console.log(resp);
    });
   }
}

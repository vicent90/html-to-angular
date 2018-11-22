import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  producto: Producto = null;
  cargando = true;

  constructor( private http: HttpClient ) {

    this.cargarProductos();

   }

   private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-8ce9f.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

   infoProducto( id: string ) {
    return this.http.get(`https://angular-html-8ce9f.firebaseio.com/productos/${ id }.json` );
  }

  buscarProducto (termino: string) {
    if ( this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
        console.log( this.productosFiltrado );
      });
    } else {
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( producto => {
      const tituloLower = producto.titulo.toLocaleLowerCase();
      if ( producto.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( producto );
      }
    });
  }
}

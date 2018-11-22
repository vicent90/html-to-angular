import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoCompleto } from '../../interfaces/producto-completo.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit {

  public id: string;
  producto: ProductoCompleto;

  constructor( private route: ActivatedRoute,
               public _productoService: ProductosService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(parametros => {
        this._productoService.infoProducto(parametros['id'])
          .subscribe( (resp: ProductoCompleto) => {
            this.id = parametros['id'];
            this.producto = resp;
          });
    });
  }
}

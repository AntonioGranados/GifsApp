import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar() {
    const gifsABuscar = this.txtBuscar.nativeElement.value;

    //Si no se escribe nada y se presiona enter no se guarda la busqueda en el historial
    if (gifsABuscar.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(gifsABuscar);
    this.txtBuscar.nativeElement.value = '';
  }
}

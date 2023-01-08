import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent {
  // Decorador que permite obtener una "referencia local" del template y lo asigna a la propiedad del TS
  // txtbuscar!: ElementRef; : Añadimos el signo "!"  ya que el elemento siempre va a existir en el html.
  // El signo "!" se le conoce como "no null assertion operator" el cual es un operador para indicar
  // que el objeto no será null.
  // HTMLInputElement : Es opcional y propio de JavaScript para líneas más abajo obtener la propiedad "value", entre otros, de "this.txtbuscar.nativeElement.value"
  @ViewChild('txtBuscar')
  txtbuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  // event : Obtenemos el evento lanzado desde el template
  // KeyboardEvent : Indicamos que es de este tipo, ya que es el que se muestra desde la consola del navegador.
  buscar2(termino: string) {
    // nativeElement : Es el objeto que encapsula a los valores lanzados por el evento.
    console.log(termino);
  }

  buscar() {
    // nativeElement : Es el objeto que encapsula a los valores lanzados por el evento.
    const valor = this.txtbuscar.nativeElement.value;
    // validación de borrar espacios en blanco
    if (valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);
    // reiniciamos el valor
    this.txtbuscar.nativeElement.value = '';
  }
}

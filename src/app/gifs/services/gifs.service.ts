import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

// providedIn: 'root' : Característica que permite que los servicios puedan estar definidos en el momento en que se consutrya el bundle de la aplicación.
// Indica a angular que no importa en qué parte de la aplicación se ubique, este servicio será único de manera global en el "root"
// De esta forma evitamos indicarlo en la propiedad "imports" del módulo "GifsModule"
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  // ATRIBUTOS
  private apiKey: string = 'uXxPSYfymmy1Rlt893V1QBkhKIkUK1lz';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //TODO: cambiar any por su tipo
  public resultados: Gif[] = [];

  // GETTER
  get historial() {
    return [...this._historial];
  }

  /*
   - HttpClient : Clase que permite hacer peticiones http bajo Observables,
   siendo estos más poderosos que las promesas que usa JavaScript.
   - El constructor del "servicio" al ser invocado se ejecutará una sola vez por ser singleton. 
   Por tal motivo lo usaremos para cargar información del "localStorage"
  */
  constructor(private http: HttpClient) {
    // 1° Opción: Indicamos que devuelva un arreglo vacio
    // en caso no exista un "historial" en el "localStorage"
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    // 2° Opción:
    /*
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    */
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  // MÉTODOS
  buscarGifs(query: string) {
    // convertimos lo obtenido a minúsculas par su mejor manipulación
    query = query.trim().toLowerCase();

    // validación en caso no incluya ya a los mismos valores del historial
    if (!this._historial.includes(query)) {
      // unshift() : Inserta el nuevo item al inicio del arreglo
      this._historial.unshift(query);
      // cortamos los 10 primeros elementos del arreglo principal
      this._historial = this._historial.splice(0, 10);

      //el localStorage, solo puede almacenar "string", por lo que nos apoyaremos con la clase "JSON"
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // HttpParams : Clase que permite construir los parámetros de una URL de una forma más sencilla.
    // set() : Permite definir los pares de valores, pormeio de una "llave - valor"
    const parametros = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log('parametros');
    console.log(parametros);

    // Petición http
    // "subscribe()" es parecido al "then()", el cual se va a ejecutar cuando tengamos la respuesta de la petición http.
    // SearchGifsResponse : Será el tipo de dato de la información obtenida por el "this.http.get()"
    // Añadiremos los parámetros como segundo argumento al método "this.http.get()""
    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, {
        params: parametros,
      })
      .subscribe((response) => {
        console.log(response.data);
        // Asignamos lo obtenido a la propiedad "resultados"
        this.resultados = response.data;
        // Guardamos el resultado en  el "localStorage"
        // localStorage : Puede almacenar información hasta de 50 MB
        localStorage.setItem('resultados', JSON.stringify(response.data));
      });
  }
}

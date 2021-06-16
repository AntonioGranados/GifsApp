import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaBusquedaGifs, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  //Arreglo para almacenar el historial de busqueda
  private _historial: string[] = [];

  //ApiKey de Giphy
  private apiKey: string = 'TUF13I6CVRLUi2eIAbif0hYwTH43pg69';

  //Url del servicio
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  
  //Arreglo para almacenar los resultados de la busqueda
  public resultadosDeLaBusqueda: Gif[] = [];

  get historial() {
    //retornamos el historial como un nuevo arreglo para no modificar el original
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //Obtenemos el historial de busqueda del localstorage
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    //Obtenemos los resultados de busqueda del localstorage
    this.resultadosDeLaBusqueda = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  //metodo para insertar las busquedas en el arreglo
  buscarGifs(terminoABuscar: string) {
    
    //Convertimos en minuscula el termino a buscar
    terminoABuscar = terminoABuscar.trim().toLowerCase();

    //Si en el historial no se encuentra el termino a buscar entonces lo agregamos al arreglo
    if(!this._historial.includes(terminoABuscar)) {
      //insertar al principio del arreglo
      this._historial.unshift(terminoABuscar);

      //Cortamos el arreglo para mantener solo 10 busquedas en el hsitorial
      this._historial = this._historial.splice(0,10);

      //Guardamos las busquedas en el localstorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '20').set('q', terminoABuscar);

    this.http.get<RespuestaBusquedaGifs>(`${this.servicioUrl}/search`, { params }).subscribe((respuesta) => {
      this.resultadosDeLaBusqueda = respuesta.data;

      //Guardamos los resultados en el localstorage
      localStorage.setItem('resultados', JSON.stringify(this.resultadosDeLaBusqueda));
    });
  }
}


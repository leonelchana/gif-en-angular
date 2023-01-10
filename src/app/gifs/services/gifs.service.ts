import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gif.interface';
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apikey: string = 'WW0VX3aBkXaaXtI2MHoXSF7rRzr7r4kS';
  private servicioUrl:string='https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];
  public resultado: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
  }
  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);
    this.http
      .get<SearchGifsResponse>(
        `${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        this.resultado = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultado));
      });
  }
}

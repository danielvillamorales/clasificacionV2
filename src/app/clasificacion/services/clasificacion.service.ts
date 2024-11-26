import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Clasificacion } from '../interfaces/clasificacion.interface';
import { catchError, first, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClasificacionService {
  private readonly apiURl: string =
    'http://jasperka.kostazul.com:8086/clasificacion';

  private readonly http = inject(HttpClient);
  getClasificacionByValor(valor: string): Observable<Clasificacion | null> {
    const params = new HttpParams().set('valor', valor);
    return this.http.get<Clasificacion[]>(this.apiURl, { params }).pipe(
      map((clasificaciones) => clasificaciones[0] || null),
      first(),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  }

  search_image(
    referencia: string,
    consecutivo: number,
    codcolor: string | null
  ): Observable<string> {
    const imagen_a_consultar: string = `http://181.204.89.156/fotosVtex/todas/${referencia}${consecutivo}${codcolor}_a.jpg`;
    return this.http.head(imagen_a_consultar, { observe: 'response' }).pipe(
      map((response) => {
        if (response.status === 200) {
          console.log(`Image found: ${imagen_a_consultar}`);
          return imagen_a_consultar;
        } else {
          return '';
        }
      }),
      catchError(() => {
        console.log(`Image not found: ${imagen_a_consultar}`);
        return of('');
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dotacion } from '../interfaces/dotacion.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DotacionService {
  private readonly apiURl: string =
    'http://jasperka.kostazul.com:8086/entrega-dotacion';

  private readonly http = inject(HttpClient);

  saveDotacion(dotacion: string[]): Observable<Dotacion[]> {
    return this.http.post<Dotacion[]>(this.apiURl, dotacion).pipe(
      catchError((err) => {
        console.log(err);
        alert(`error: ${err.error.message}`);
        return of([]);
      })
    );
  }
}

import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, Subscription, Observable, of } from 'rxjs';
import { ClasificacionService } from '../../services/clasificacion.service';
import { Clasificacion } from '../../interfaces/clasificacion.interface';
import { CommonModule } from '@angular/common';
import { ReplaceSpacePipe } from '../../../shared/pipes/replace-space.pipe';
import { LoaderComponent } from '../../../shared/pages/loader/loader.component';
import { TitleComponent } from '../../../shared/pages/title/title.component';

@Component({
  selector: 'app-clasificacion',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ReplaceSpacePipe, TitleComponent],
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.css',
})
export default class ClasificacionComponent {
  private readonly debouncer = new Subject<string>();
  private debouncerSubscription?: Subscription;
  private readonly clasificacionSevice = inject(ClasificacionService);
  public isLoading = signal<boolean>(false);
  public clasificacion = signal<Clasificacion | null>(null);
  public imagen = computed(() => this.buscar_imagen());
  @ViewChild('valor') valor: ElementRef = new ElementRef('');

  ngOnInit(): void {
    this.__initiateDebouncer();
  }

  private __initiateDebouncer() {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(3000))
      .subscribe((value) => {
        console.log('Debouncer value');
        this.searchToEnter(value);
      });
  }

  buscar_imagen(): Observable<string> {
    console.log('Computing image');
    const clasificacion_value = this.clasificacion();
    if (clasificacion_value == null) {
      return of('');
    }
    const { referencia, consecutivo, codcolor } = clasificacion_value;
    return this.clasificacionSevice.search_image(
      referencia,
      consecutivo,
      codcolor
    );
  }

  searchToEnter(valor: string) {
    console.log(valor);
    this.isLoading.set(true);
    this.clasificacionSevice
      .getClasificacionByValor(valor.toUpperCase())
      .subscribe((clasificaciones) => {
        if (!clasificaciones) {
          console.log('No se encontraron resultados');
          this.clasificacion.set(null);
          this.valor.nativeElement.value = '';
          this.isLoading.set(false);
          return;
        }
        this.clasificacion.set(clasificaciones);
        this.valor.nativeElement.value = '';
        this.isLoading.set(false);
      });
  }

  onKeyPress(event: KeyboardEvent, eventValue: string) {
    if (event.key === 'Enter') {
      this.searchToEnter(eventValue);
      this.debouncerSubscription?.unsubscribe();
      this.__initiateDebouncer();
    } else {
      console.log('Tecla presionada');
      this.debouncer.next(eventValue);
    }
  }
}

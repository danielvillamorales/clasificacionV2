import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/pages/title/title.component';
import { Dotacion } from '../../interfaces/dotacion.interface';
import { DotacionService } from '../../services/dotacion.service';
import { LoaderComponent } from '../../../shared/pages/loader/loader.component';

@Component({
  selector: 'app-dotacion',
  standalone: true,
  imports: [CommonModule, TitleComponent, LoaderComponent],
  templateUrl: './dotacion.component.html',
  styleUrl: './dotacion.component.css',
})
export default class DotacionComponent {
  selectedFile: File | null = null;
  fileContent: string | null = null;
  isLoading = signal(false);
  dotaciones_entregadas = signal<Dotacion[]>([]);
  private readonly service = inject(DotacionService);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = reader.result as string;
      };
      reader.readAsText(this.selectedFile);
    }
  }

  onUpload(): void {
    if (this.fileContent) {
      console.log(this.fileContent);
      const lines = this.fileContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      this.sendData(lines);
    } else {
      console.error('No file content to upload');
      alert('no hay contenido en el archivo');
    }
  }

  sendData(lines: string[]): void {
    console.log(lines);
    this.isLoading.set(true);
    this.service.saveDotacion(lines).subscribe((response) => {
      console.log(response);
      this.dotaciones_entregadas.set(response);
      if (this.dotaciones_entregadas.length > 0) {
        alert('Dotaciones guardadas correctamente');
      }
      this.isLoading.set(false);
    });
    const input = document.getElementById('archivo') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
}

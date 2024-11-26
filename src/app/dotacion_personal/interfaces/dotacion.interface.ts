export interface Dotacion {
  id: number;
  fecha: Date;
  empleado: number;
  dotacion: number;
  talla: string;
  cantidad: number;
  observaciones: string;
  fechahoradecreacion: Date;
  usuariodecreacion: string;
  valorunitario: number;
  nominaelectronicadetid?: number;
}

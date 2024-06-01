export class Curso {
  carrera_id: number;
  id: number;
  nombre: string;
  capacidad: number;

  constructor(carrera_id: number, id: number, nombre: string, capacidad: number) {
    this.carrera_id = carrera_id;
    this.id = id;
    this.nombre = nombre;
    this.capacidad = capacidad;
  }
}
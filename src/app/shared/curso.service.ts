import { Curso } from '../Models/curso'


export class CursoService {
  private cursos: Curso[] = [];

  constructor() { }

  setCurso(curso: Curso): void {
    this.cursos.push(curso);
  }

  getCursos(): Curso[] {
    return this.cursos;
  }

}
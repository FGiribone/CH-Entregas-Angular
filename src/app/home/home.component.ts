import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent {
  updates = [
    {
      date: 'April 23, 2024',
      events: [
        {
          title: 'Registro para Prueba de Ingreso',
          name: 'Prueba de Ingreso - Ingeniería',
          period: 'April 23rd, After Update ~ May 6th, 23:59 (UTC+8)',
          description: 'Se abre el registro para la Prueba de Ingreso a la Facultad de Ingeniería.',
          howToParticipate: 'Regístrate en línea antes de la fecha límite para poder participar en la prueba.'
        }
      ],
      futureEvents: 'Próximamente: Semana de Orientación para Estudiantes de Nuevo Ingreso.'
    }
  ];

  academicSchedule = [
    { date: '25 de abril', description: 'Exámenes finales' },
    { date: '1 de mayo', description: 'Día festivo' },
    { date: '10 de mayo', description: 'Inicio del nuevo semestre' }
  ];

  constructor() {}
}
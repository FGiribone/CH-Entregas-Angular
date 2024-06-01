import { Component,OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from '../../components/reactive-form/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
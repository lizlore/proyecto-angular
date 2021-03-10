import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public title: String;
  public subtitle: String; 
  public email: String;

  constructor() {
    this. title = 'Lorena Zamorano',
    this.subtitle = 'Desarrolladora Frontend';
    this.email = 'loreliz@gmail.com'
  }

  ngOnInit(): void {
  }

}

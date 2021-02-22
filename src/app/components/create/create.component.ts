import { Component, OnInit } from '@angular/core';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass'],
  providers: [ProjectService],
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;

  constructor(private _projectService: ProjectService) {
    this.title = 'Crear proyecto';
    this.project = new Project('', '', '', '', 2021, '', '');
  }

  ngOnInit(): void {}
}

const data = (form) => {
  console.log('hola');
};

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
  public status: string;

  constructor(private _projectService: ProjectService) {
    this.title = 'Crear proyecto';
    this.project = new Project('', '', '', '', 2021, '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      (response) => {
        console.log('response: ', response);
        if (response) {
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'failed';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}

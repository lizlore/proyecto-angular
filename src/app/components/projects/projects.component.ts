import { Component, OnInit } from '@angular/core';
import { Project } from './.././../models/project';
import { ProjectService } from './.././../services/project.service';
import { Global } from './.././../services/global';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
  providers: [ProjectService],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;
  constructor(private projectService: ProjectService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      (response) => {
        if (response.projects) {
          this.projects = response.projects;
        }
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}

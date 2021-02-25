import { Component, OnInit } from '@angular/core';
import { Project } from './.././../models/project';
import { ProjectService } from './.././../services/project.service';
import { Global } from './.././../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass'],
  providers: [ProjectService],
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  public confirm: boolean;
  constructor(
    private projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id) {
    this.projectService.getProject(id).subscribe(
      (response) => {
        this.project = response.project;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteProject(id) {
    this.projectService.deleteProject(id).subscribe(
      (response) => {
        if (response.project) {
          this._router.navigate(['/proyectos']);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  setConfirm(confirm) {
    this.confirm = confirm;
  }
}

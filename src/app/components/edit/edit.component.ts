import { Component, OnInit } from '@angular/core';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { UploadtService } from './../../services/upload.service';
import { Global } from './../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.sass'],
  providers: [ProjectService, UploadtService],
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: any;
  public save_project;
  public url: string;

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadtService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar proyecto';
    this.url = Global.url;
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

  onSubmit(){
  	this.projectService.updateProject(this.project).subscribe(
		response => {
  			if(response.project){
				
				// Subir la imagen
				if(this.filesToUpload){
					this.uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
					.then((result:any) => {
						this.save_project = result.project;
						this.status = 'success';
					});
				}else{
					this.save_project = response.project;
					this.status = 'success';
				}
				
			}else{
				this.status = 'failed';
			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

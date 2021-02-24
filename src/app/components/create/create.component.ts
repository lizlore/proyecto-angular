import { Component, OnInit } from '@angular/core';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { UploadtService } from './../../services/upload.service';
import { Global } from './../../services/global';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass'],
  providers: [ProjectService, UploadtService],
})
export class CreateComponent implements OnInit {
  public title: string;
  public projec: Project;
  public status: string;
  public filesToUpload: any;

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadtService
  ) {
    this.title = 'Crear proyecto';
    this.projec = new Project('', '', '', '', 2021, '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    console.log(this.projec);
    this.projectService.saveProject(this.projec).subscribe(
      (response) => {
        console.log('response: ', response);
        if (response) {
          this.status = 'success';
          // Subir imagen
          this.uploadService
            .makeFileRequest(
              Global.url + 'upload-image/' + response.project._id,
              [],
              this.filesToUpload,
              'image'
            )
            .then((result: any) => {
              console.log(result);
              form.reset();
            });
        } else {
          this.status = 'failed';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
